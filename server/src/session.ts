import session, { Session, SessionOptions } from 'express-session';
import redis from 'redis';
import { log } from './logging';
import { TokenSetParameters } from 'openid-client';
import { tokenSetSessionKey } from './tokenDingsClient';
import { Request } from 'express';

const RedisStore = require('connect-redis')(session);

export type RequestMedSession = Request & {
    session: SessionMedTokenSet;
};

export type SessionMedTokenSet = Session & {
    nonce: string | null;
    state: string | null;
    tokenSet?: TokenSetParameters;
    [tokenSetSessionKey]?: TokenSetParameters;
};

export const setupSession = () => {
    const options: SessionOptions = {
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // To timer
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: process.env.NAIS_CLUSTER_NAME ? process.env.SESSION_SECRET! : 'en secret',
        resave: false,
        name: 'tilretteleggingsbehov-innsyn',
        saveUninitialized: false,
    };

    if (process.env.NAIS_CLUSTER_NAME) {
        options.cookie!.secure = true;
        options.store = setupRedis();
    }

    return session(options);
};

const setupRedis = () => {
    log.info('Setter opp redis');

    const client = redis.createClient({
        database: 1,
        socket: {
            host: 'tilretteleggingsbehov-innsyn-redis.arbeidsgiver.svc.cluster.local',
            port: 6379,
        },
        password: process.env.REDIS_PASSWORD,
    });

    client.unref();

    client.on('info', log.info);
    client.on('debug', log.debug);
    client.on('error', log.error);

    return new RedisStore({
        client,
        disableTouch: true,
    });
};
