const path = require('path');
const express = require('express');
const sonekryssing = require('./sonekryssing.js');
const app = express();

const PORT = 3000;
const BASE_PATH = '/tilretteleggingsbehov-innsyn';

const buildPath = path.join(__dirname, '../build');

const startServer = () => {
    console.log("healthurls server", `${BASE_PATH}/api/health`)
    app.use(`${BASE_PATH}/api/health`, sonekryssing);
    app.use(BASE_PATH, express.static(buildPath));
    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

startServer();
