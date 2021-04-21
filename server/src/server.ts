import { Request, Response } from 'express';
import { authUrl, getIdPortenTokenSet, init } from './auth';
import { generators } from 'openid-client';
import { setupSession } from './session';
import { log } from './logging';

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const PORT = 3000;

const BASE_PATH = '/person/behov-for-tilrettelegging';
const LOCAL_LOGIN_URL = 'http://localhost:8080/finn-kandidat-api/local/selvbetjening-login';
const LOCAL_LOGIN_WITH_REDIRECT = `${LOCAL_LOGIN_URL}?redirect=http://localhost:${PORT}${BASE_PATH}/`;

const LOGIN_URL = process.env.LOGIN_URL || LOCAL_LOGIN_WITH_REDIRECT;
const buildPath = path.join(__dirname, '../../build');
const server = express();

const startServer = async (html: string) => {
    await init();
    server.use(setupSession());

    server.use(BASE_PATH, express.static(buildPath, { index: false }));
    server.get(BASE_PATH, (req: Request, res: Response) => {
        res.send(html);
    });

    server.get(`${BASE_PATH}/login`, (req: Request, res: Response) => {
        const nonce = generators.nonce();
        const state = generators.state();
        (req.session as any).nonce = nonce;
        (req.session as any).state = state;
        res.redirect(authUrl(nonce, state));
    });

    server.get(`${BASE_PATH}/oauth2/callback`, async (req: Request, res: Response) => {
        try {
            const tokensSet = await getIdPortenTokenSet(req);
            log.info('Fikk TokenSet', tokensSet);
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
        log.info('Server kjører på port', PORT);
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
    server.use(cookieParser());

    renderAppMedDekoratør().then(startServer, logError('Kunne ikke rendre app!'));
};

initialiserServer();
