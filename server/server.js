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

const renderAppMedDekoratør = dekoratør =>
    new Promise((resolve, reject) => {
        console.log('Injiserer dekoratør i HTML-template ...');
        app.render('index.html', dekoratør, (err, html) => {
            if (err) {
                reject(err);
            } else {
                console.log('> Suksess!\n');
                resolve(html);
            }
        });
    });

const startServer = html => {
    const ignorerIndex = { index: false };

    app.use(BASE_PATH, express.static(buildPath, ignorerIndex));

    app.get(`${BASE_PATH}/*`, (req, res) => {
        res.send(html);
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

const behandleFeil = feil => error => {
    console.error(`${feil}:`, error);
    process.exit(1);
};

hentDekoratør()
    .then(renderAppMedDekoratør, behandleFeil('Kunne ikke hente dekoratør'))
    .then(startServer, behandleFeil('Kunne ikke rendre app'));
