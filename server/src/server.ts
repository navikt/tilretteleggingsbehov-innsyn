import path from 'path';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { TokenSet } from 'openid-client';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import * as idPortenClient from './idPortenClient';
import { setupSession } from './session';
import { log } from './logging';
import {
    sjekkAtLoggetInnHosIdPorten,
    idPortenCallbackEndepunkt,
    loginHosIdPorten,
} from './idPortenEndepunkt';

const PORT = 3000;
export const BASE_PATH = '/person/behov-for-tilrettelegging';
const buildPath = path.join(__dirname, '../../build');

const express = require('express');
const server = express();

export type RequestMedSession = Request & {
    session: Session & { nonce: string | null; state: string | null; tokenSet: TokenSet | null };
};

const startServer = async (html: string) => {
    await idPortenClient.init();

    // Trenger denne for å kunne autentisere mot ID-Porten
    server.set('trust proxy', 1);

    server.use(setupSession());

    server.get(
        [`${BASE_PATH}/internal/isAlive`, `${BASE_PATH}/internal/isReady`],
        (req: Request, res: Response) => res.sendStatus(200)
    );

    server.get(`${BASE_PATH}/login`, loginHosIdPorten);
    server.get(`${BASE_PATH}/oauth2/callback`, idPortenCallbackEndepunkt);

    server.use(async (req: RequestMedSession, res: Response, next: () => void) => {
        const kreverIngenInnlogging = [
            `${BASE_PATH}/login`,
            `${BASE_PATH}/oauth2/callback`,
            `${BASE_PATH}/internal/isAlive`,
            `${BASE_PATH}/internal/isReady`,
        ];

        if (kreverIngenInnlogging.includes(req.path)) return next();
        await sjekkAtLoggetInnHosIdPorten(req, res, next);
    });

    server.get(BASE_PATH, (req: Request, res: Response) => {
        console.log('Server HTML');
        res.send(html);
    });

    server.use(BASE_PATH, express.static(buildPath, { index: false }));

    server.listen(PORT, () => {
        log.info('Server kjører på port ' + PORT);
    });
};

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
