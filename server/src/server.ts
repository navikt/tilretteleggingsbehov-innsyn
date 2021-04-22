import { Request, Response } from 'express';
import { authUrl, getIdPortenTokenSet, initIdPortenIssuer } from './auth';
import { generators, TokenSet } from 'openid-client';
import { setupSession } from './session';
import { log } from './logging';
import { Session } from 'express-session';

const path = require('path');
const express = require('express');
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const PORT = 3000;

const BASE_PATH = '/person/behov-for-tilrettelegging';
const LOCAL_LOGIN_URL = 'http://localhost:8080/finn-kandidat-api/local/selvbetjening-login';
const LOCAL_LOGIN_WITH_REDIRECT = `${LOCAL_LOGIN_URL}?redirect=http://localhost:${PORT}${BASE_PATH}/`;

const LOGIN_URL = process.env.LOGIN_URL || LOCAL_LOGIN_WITH_REDIRECT;
const buildPath = path.join(__dirname, '../../build');
const server = express();

export type RequestMedSession = Request & {
    session: Session & { nonce: string | null; state: string | null; tokenSet: TokenSet | null };
};

const startServer = async (html: string) => {
    await initIdPortenIssuer();

    // Trenger denne for å kunne autentisere mot ID-Porten
    server.set('trust proxy', 1);
    server.use(setupSession());

    server.use(BASE_PATH, express.static(buildPath, { index: false }));
    server.get(BASE_PATH, (req: Request, res: Response) => {
        res.send(html);
    });

    server.get(`${BASE_PATH}/login`, (req: RequestMedSession, res: Response) => {
        const nonce = generators.nonce();
        const state = generators.state();
        req.session.nonce = nonce;
        req.session.state = state;

        res.redirect(authUrl(nonce, state));
    });

    server.get(`${BASE_PATH}/oauth2/callback`, async (req: RequestMedSession, res: Response) => {
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

            res.redirect(BASE_PATH);
        } catch (error) {
            log.error('Kunne ikke hente token set', error);
        }
    });

    server.get(`${BASE_PATH}/internal/isAlive`, (req: Request, res: Response) =>
        res.sendStatus(200)
    );
    server.get(`${BASE_PATH}/internal/isReady`, (req: Request, res: Response) =>
        res.sendStatus(200)
    );
    server.get(`${BASE_PATH}/redirect-til-login`, (_: Request, res: Response) => {
        res.redirect(LOGIN_URL);
    });

    server.listen(PORT, () => {
        log.info('Server kjører på port ' + PORT);
    });
};

const renderAppMedDekoratør = (): Promise<string> => {
    const env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';
    return injectDecoratorServerSide({ env, filePath: `${buildPath}/index.html` });
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
