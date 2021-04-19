"use strict";
exports.__esModule = true;
var openid_client_1 = require("openid-client");
var discoveryUrl = process.env.IDPORTEN_WELL_KNOWN_URL;
var idporten = await openid_client_1.Issuer.discover(discoveryUrl);
