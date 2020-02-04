const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const BASE_PATH = '/tilretteleggingsbehov-innsyn';

const buildPath = path.join(__dirname, '../build');

const startServer = () => {
    app.use(BASE_PATH, express.static(buildPath));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

startServer();
