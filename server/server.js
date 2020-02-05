const path = require('path');
const express = require('express');
const hentDekoratør = require('./dekoratør');
const mustacheExpress = require('mustache-express');

const buildPath = path.join(__dirname, '../build');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const PORT = 3000;
const BASE_PATH = '/tilretteleggingsbehov-innsyn';

const startServer = html => {
    const ignorerIndex = { index: false };

    app.use(BASE_PATH, express.static(buildPath, ignorerIndex));
    app.get(BASE_PATH, (_, res) => {
        res.send(html);
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

const renderAppMedDekoratør = dekoratør =>
    new Promise((resolve, reject) => {
        app.render('index.html', dekoratør, (err, html) => {
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

console.log('Starter server ...');
hentDekoratør()
    .catch(logError('Kunne ikke hente dekoratør!'))
    .then(renderAppMedDekoratør, logError('Kunne ikke injisere dekoratør!'))
    .then(startServer, logError('Kunne ikke rendre app!'));
