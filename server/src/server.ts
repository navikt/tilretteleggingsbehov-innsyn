import { generators } from 'openid-client';
import { authUrl } from './auth';
import { Request, Response } from 'express';

const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const cookieParser = require('cookie-parser');
const { init } = require('./auth');
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const PORT = 3000;
const BASE_PATH = '/person/behov-for-tilrettelegging';

const LOCAL_LOGIN_URL = 'http://localhost:8080/finn-kandidat-api/local/selvbetjening-login';
const LOCAL_LOGIN_WITH_REDIRECT = `${LOCAL_LOGIN_URL}?redirect=http://localhost:${PORT}${BASE_PATH}/`;
const LOGIN_URL = process.env.LOGIN_URL || LOCAL_LOGIN_WITH_REDIRECT;

const buildPath = path.join(__dirname, '../../build');
const server = express();

init();

const startServer = (html: string) => {
    server.use(BASE_PATH, express.static(buildPath, { index: false }));
    server.get(BASE_PATH, (req: Request, res: Response) => {
        res.send(html);
    });

    server.get('/login', async (req: Request, res: Response) => {
        res.redirect(authUrl(req.session, generators.nonce(), generators.state()));
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
        console.log('Server kjører på port', PORT);
    });
};

const renderAppMedDekoratør = (): Promise<string> => {
    const env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';
    return injectDecoratorServerSide({ env, filePath: `${buildPath}/index.html` });
};

const logError = (feil: string) => (error: string) => {
    console.error('> ' + feil);
    console.error('> ' + error);

    process.exit(1);
};

const initialiserServer = () => {
    console.log('Initialiserer server ...');
    server.engine('html', mustacheExpress());
    server.set('view engine', 'mustache');
    server.set('views', buildPath);
    server.use(cookieParser());

    renderAppMedDekoratør().then(startServer, logError('Kunne ikke rendre app!'));
};

initialiserServer();
