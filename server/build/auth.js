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
exports.authUrl = exports.init = void 0;
var openid_client_1 = require("openid-client");
var discoveryUrl = process.env.IDPORTEN_WELL_KNOWN_URL ||
    'https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration';
var clientId = process.env.IDPORTEN_CLIENT_ID;
var redirectUri = process.env.IDPORTEN_REDIRECT_URI || 'http://localhost:3000/oauth2/callback';
var jwk = process.env.IDPORTEN_CLIENT_JWK;
var idPortenScope = 'openid profile';
var idportenClient;
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var idportenIssuer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openid_client_1.Issuer.discover(discoveryUrl)];
            case 1:
                idportenIssuer = _a.sent();
                try {
                    idportenClient = new idportenIssuer.Client({
                        client_id: clientId,
                        token_endpoint_auth_method: 'private_key_jwt',
                        token_endpoint_auth_signing_alg: 'RS256',
                        redirect_uris: [redirectUri, 'http://localhost:3000/oauth2/callback'],
                        response_types: ['code']
                    }, {
                        keys: [JSON.parse(jwk)]
                    });
                }
                catch (err) {
                    console.log('Kunne ikke opprette idportenClient', err);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.init = init;
var authUrl = function (session, nonce, state) {
    return idportenClient.authorizationUrl({
        scope: idPortenScope,
        redirect_uri: redirectUri,
        response_type: 'code',
        response_mode: 'query',
        nonce: nonce,
        state: state,
        resource: 'https://nav.no',
        acr_valus: 'Level4'
    });
};
exports.authUrl = authUrl;
