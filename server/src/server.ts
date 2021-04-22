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
    session: Session & { nonce: string; state: string; tokenSet: TokenSet };
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
            const tokensSet = await getIdPortenTokenSet(req);
            // TODO: Fjern logging
            log.info('Fikk TokenSet ' + JSON.stringify(tokensSet));

            // TODO
            // reset nonce og state
            // lagre token i session
            // sende cookie med id_token
            // redirect til riktig sted
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

const logError = (feil: string) => (error: string) => {
    log.error(feil);
    log.error(error);

    process.exit(1);
};

const initialiserServer = () => {
    log.info('Initialiserer server ...');
    renderAppMedDekoratør().then(startServer, logError('Kunne ikke rendre app!'));
};

initialiserServer();
