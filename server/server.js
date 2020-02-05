const path = require('path');
const express = require('express');
const hentDekoratør = require('./dekoratør');
const mustacheExpress = require('mustache-express');
const sonekryssing = require('./sonekryssing.js');

const PORT = 3000;
const BASE_PATH = '/tilretteleggingsbehov-innsyn';

const buildPath = path.join(__dirname, '../build');
const server = express();

const startServer = html => {
    server.use(BASE_PATH, express.static(buildPath, { index: false }));
    server.get(BASE_PATH, (_, res) => {
        res.send(html);
    });

    server.use(`${BASE_PATH}/api/health`, sonekryssing);
    server.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    server.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

const renderAppMedDekoratør = dekoratør =>
    new Promise((resolve, reject) => {
        server.render('index.html', dekoratør, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const logError = feil => error => {
    console.error('> ' + feil);
    console.error('> ' + error);

    process.exit(1);
};

const initialiserMustacheEngine = () => {
    server.engine('html', mustacheExpress());
    server.set('view engine', 'mustache');
    server.set('views', buildPath);
};

const initialiserServer = () => {
    console.log('Initialiserer server ...');
    initialiserMustacheEngine();

    hentDekoratør()
        .catch(logError('Kunne ikke hente dekoratør!'))
        .then(renderAppMedDekoratør, logError('Kunne ikke injisere dekoratør!'))
        .then(startServer, logError('Kunne ikke rendre app!'));
};

initialiserServer();
