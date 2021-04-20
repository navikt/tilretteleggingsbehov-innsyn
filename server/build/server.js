"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var openid_client_1 = require("openid-client");
var auth_1 = require("./auth");
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var init = require('./auth').init;
var injectDecoratorServerSide = require('@navikt/nav-dekoratoren-moduler/ssr').injectDecoratorServerSide;
var PORT = 3000;
var BASE_PATH = '/person/behov-for-tilrettelegging';
var LOCAL_LOGIN_URL = 'http://localhost:8080/finn-kandidat-api/local/selvbetjening-login';
var LOCAL_LOGIN_WITH_REDIRECT = LOCAL_LOGIN_URL + "?redirect=http://localhost:" + PORT + BASE_PATH + "/";
var LOGIN_URL = process.env.LOGIN_URL || LOCAL_LOGIN_WITH_REDIRECT;
var buildPath = path.join(__dirname, '../../build');
var server = express();
init();
var startServer = function (html) {
    server.use(BASE_PATH, express.static(buildPath, { index: false }));
    server.get(BASE_PATH, function (req, res) {
        res.send(html);
    });
    server.get('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.redirect(auth_1.authUrl(req.session, openid_client_1.generators.nonce(), openid_client_1.generators.state()));
            return [2 /*return*/];
        });
    }); });
    server.get(BASE_PATH + "/internal/isAlive", function (req, res) {
        return res.sendStatus(200);
    });
    server.get(BASE_PATH + "/internal/isReady", function (req, res) {
        return res.sendStatus(200);
    });
    server.get(BASE_PATH + "/redirect-til-login", function (_, res) {
        res.redirect(LOGIN_URL);
    });
    server.listen(PORT, function () {
        console.log('Server kjører på port', PORT);
    });
};
var renderAppMedDekoratør = function () {
    var env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';
    return injectDecoratorServerSide({ env: env, filePath: buildPath + "/index.html" });
};
var logError = function (feil) { return function (error) {
    console.error('> ' + feil);
    console.error('> ' + error);
    process.exit(1);
}; };
var initialiserServer = function () {
    console.log('Initialiserer server ...');
    server.use(cookieParser());
    renderAppMedDekoratør().then(startServer, logError('Kunne ikke rendre app!'));
};
initialiserServer();
