import path from 'path';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { generators, TokenSet } from 'openid-client';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { authUrl, getIdPortenTokenSet, initIdPortenIssuer, oppdaterToken } from './auth';
import { setupSession } from './session';
import { log } from './logging';

const PORT = 3000;
const BASE_PATH = '/person/behov-for-tilrettelegging';
const buildPath = path.join(__dirname, '../../build');

const express = require('express');
const server = express();

export type RequestMedSession = Request & {
    session: Session & { nonce: string | null; state: string | null; tokenSet: TokenSet | null };
};

const startServer = async (html: string) => {
    await initIdPortenIssuer();

    // Trenger denne for å kunne autentisere mot ID-Porten
    server.set('trust proxy', 1);

    server.use(setupSession());

    server.get(
        [`${BASE_PATH}/internal/isAlive`, `${BASE_PATH}/internal/isReady`],
        (req: Request, res: Response) => res.sendStatus(200)
    );

    server.get(`${BASE_PATH}/login`, (req: RequestMedSession, res: Response) => {
        log.info('Login');

        const nonce = generators.nonce();
        const state = generators.state();
        req.session.nonce = nonce;
        req.session.state = state;

        res.redirect(authUrl(nonce, state));
    });

    server.use(async (req: RequestMedSession, res: Response, next: () => void) => {
        const kreverIngenInnlogging = [
            `${BASE_PATH}/login`,
            `${BASE_PATH}/oauth2/callback`,
            `${BASE_PATH}/internal/isAlive`,
            `${BASE_PATH}/internal/isReady`,
        ];

        if (kreverIngenInnlogging.includes(req.path)) return next();

        log.info('Check auth');

        let currentTokens = req.session.tokenSet;

        if (!currentTokens) {
            log.info('Har ikke token i session, redirecter til login');
            res.redirect(`${BASE_PATH}/login`);
        } else {
            const currentTokenSet = new TokenSet(currentTokens);

            if (currentTokenSet.expired() && currentTokenSet.refresh_token) {
                log.info('Oppdaterer utløpt token');

                try {
                    const oppdatertTokenSet = await oppdaterToken(currentTokenSet.refresh_token);
                    req.session.tokenSet = new TokenSet(oppdatertTokenSet);
                } catch (error) {
                    log.error('Kunne ikke oppdatere utløpt token:', error);
                    req.session.destroy((error) => {
                        log.error('Klarte ikke å slette utløpt token:', error);
                    });

                    res.redirect(`${BASE_PATH}/login`);
                }
            } else {
                log.info('Fant gyldig token i session');
            }

            next();
        }
    });

    server.get(BASE_PATH, (req: Request, res: Response) => {
        console.log('Server HTML');
        res.send(html);
    });

    server.use(BASE_PATH, express.static(buildPath, { index: false }));

    server.get(`${BASE_PATH}/oauth2/callback`, async (req: RequestMedSession, res: Response) => {
        log.info('Callback');

        try {
            const session = req.session;
            const tokenSet = await getIdPortenTokenSet(req);

            // TODO: Fjern logging
            log.info('Fikk TokenSet ' + JSON.stringify(tokenSet));

            session.nonce = null;
            session.state = null;
            session.tokenSet = tokenSet;

            res.cookie('tilretteleggingsbehov-innsyn-id-token', tokenSet.id_token, {
                secure: true,
                sameSite: 'lax',
                maxAge: 2 * 60 * 60 * 1000, // 2 timer
            });

            log.info('Har fått token, redirecter tilbake til base path');
            res.redirect(BASE_PATH);
        } catch (error) {
            log.error('Kunne ikke hente token set', error);
        }
    });

    server.listen(PORT, () => {
        log.info('Server kjører på port ' + PORT);
    });
};

const renderAppMedDekoratør = (): Promise<string> => {
    const env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';
    return injectDecoratorServerSide({ filePath: `${buildPath}/index.html`, env });
};

const initialiserServer = async () => {
    log.info('Initialiserer server ...');

    try {
        const html = await renderAppMedDekoratør();
        startServer(html);
    } catch (error) {
        log.error('Kunne ikke rendre app:', error);
        process.exit(1);
    }
};

initialiserServer();
