import session, { SessionOptions } from 'express-session';
// import redis from 'redis';
// import * as config from './config.js';
// import RedisStore from 'connect-redis';

export const setupSession = () => {
    const options: SessionOptions = {
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // To timer
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: 'secret',
        name: 'tilretteleggingsbehov-innsyn',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
    };
    // TODO
    // if (process.env.NODE_ENV !== 'development') {
    //     options.cookie.secure = true;
    //     options.store = setupRedis();
    // }
    return session(options);
};
//
// const setupRedis = () => {
//     const store = RedisStore(session);
//     const client = redis.createClient({
//         host: config.session.redisHost,
//         password: config.session.redisPassword,
//         port: config.session.redisPort,
//     });
//     client.unref();
//     client.on('debug', console.log);
//
//     return new store({
//         client: client,
//         disableTouch: true,
//     });
// };
