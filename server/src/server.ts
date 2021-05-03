import path from 'path';
import express, { Request, RequestHandler, Response } from 'express';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as idPortenClient from './idPortenClient';
import * as tokendingsClient from './tokenDingsClient';
import { SessionMedTokenSet, setupSession } from './session';
import { log } from './logging';
import {
    sikreAtErLoggetInnHosIdPorten,
    idPortenCallbackEndepunkt,
    loginHosIdPorten,
} from './idPortenEndepunkt';

export const PORT = 3000;
export const BASE_PATH = '/person/behov-for-tilrettelegging';

const finnKandidatApiUrl = process.env.FINN_KANDIDAT_API!;
const buildPath = path.join(__dirname, '../../build');
const server = express();

const startServer = async (html: string) => {
    await idPortenClient.init();
    await tokendingsClient.init();

    // Trenger denne for å kunne autentisere mot ID-Porten
    server.set('trust proxy', 1);

    server.use(setupSession());

    server.get(
        [`${BASE_PATH}/internal/isAlive`, `${BASE_PATH}/internal/isReady`],
        (req: Request, res: Response) => res.sendStatus(200)
    );

    server.get(`${BASE_PATH}/login`, loginHosIdPorten as any);
    server.get(`${BASE_PATH}/oauth2/callback`, idPortenCallbackEndepunkt as any);

    server.use(async (req: Request, res: Response, next: () => void) => {
        const kreverIngenInnlogging = [
            `${BASE_PATH}/login`,
            `${BASE_PATH}/oauth2/callback`,
            `${BASE_PATH}/internal/isAlive`,
            `${BASE_PATH}/internal/isReady`,
        ];

        if (kreverIngenInnlogging.includes(req.path)) return next();
        await sikreAtErLoggetInnHosIdPorten(req as any, res, next);
    });

    server.get(BASE_PATH, (req: Request, res: Response) => {
        console.log('Server HTML');
        res.send(html);
    });

    server.use(BASE_PATH, express.static(buildPath, { index: false }));

    server.get(
        `${BASE_PATH}/tilretteleggingsbehov`,
        brukAccessToken,
        setupProxy(`${BASE_PATH}`, finnKandidatApiUrl)
    );

    server.listen(PORT, () => {
        log.info('Server kjører på port ' + PORT);
    });
};

const brukAccessToken: RequestHandler = async (req, res, next) => {
    const accessToken = await tokendingsClient.getAccessToken(req.session as SessionMedTokenSet);

    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    next();
};

const setupProxy = (fraPath: string, tilTarget: string): RequestHandler =>
    createProxyMiddleware(fraPath, {
        target: tilTarget,
        changeOrigin: true,
        secure: true,
        pathRewrite: (path: string) => {
            const nyPath = path.replace(fraPath, '');
            console.log(`Proxy fra '${path}' til '${tilTarget + nyPath}'`);
            return nyPath;
        },
    });

const renderAppMedDekoratør = (): Promise<string> => {
    const env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';
    return injectDecoratorServerSide({ filePath: `${buildPath}/index.html`, env });
};

const hentDekoratørOgStartServer = async () => {
    log.info('Initialiserer server ...');

    try {
        const html = await renderAppMedDekoratør();
        startServer(html);
    } catch (error) {
        log.error('Kunne ikke rendre app:', error);
        process.exit(1);
    }
};

hentDekoratørOgStartServer();
