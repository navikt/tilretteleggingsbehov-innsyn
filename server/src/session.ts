import session, { SessionOptions } from 'express-session';
import redis from 'redis';
import RedisStore from 'connect-redis';
import { log } from './logging';

export const setupSession = () => {
    const options: SessionOptions = {
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // To timer
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: 'secret', // TODO
        name: 'tilretteleggingsbehov-innsyn',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
    };

    if (process.env.NAIS_CLUSTER_NAME) {
        options.cookie!.secure = true;
        options.store = setupRedis();
    }
    return session(options);
};

const setupRedis = () => {
    const store = RedisStore(session);
    const options = {
        host: 'tilretteleggingsbehov-innsyn-redis.arbeidsgiver.svc.cluster.local',
        password: process.env.REDIS_PASSWORD,
        port: 6379,
    };
    const client = redis.createClient(options);
    client.unref();
    client.on('debug', log.debug);

    return new store({
        client: client,
        disableTouch: true,
    });
};
