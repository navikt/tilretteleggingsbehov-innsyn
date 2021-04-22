import session, { SessionOptions } from 'express-session';
import redis from 'redis';
import { log } from './logging';

/* tslint:disable */
const RedisStore = require('connect-redis')(session);
/* tslint:enable */

export const setupSession = () => {
    const options: SessionOptions = {
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // To timer
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: 'secret', // TODO
        resave: false,
        name: 'tilretteleggingsbehov-innsyn',
        saveUninitialized: false,
    };

    // TODO
    // if (process.env.NAIS_CLUSTER_NAME) {
    options.cookie!.secure = true;
    options.store = setupRedis();
    // }
    return session(options);
};

const setupRedis = () => {
    log.info('Setter opp redis');

    const client = redis.createClient({
        db: 1,
        host: 'tilretteleggingsbehov-innsyn-redis.arbeidsgiver.svc.cluster.local',
        password: process.env.REDIS_PASSWORD,
        port: 6379,
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
