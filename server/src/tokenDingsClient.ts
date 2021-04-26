import { Client, Issuer } from 'openid-client';
import { log } from './logging';

let tokendingsClient: Client;
let tokendingsIssuerName: String;

const config = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL!,
    clientId: process.env.TOKEN_X_CLIENT_ID!,
    jwk: process.env.TOKEN_X_PRIVATE_JWK!,
};

const init = async () => {
    const tokendingsIssuer = await Issuer.discover(config.discoveryUrl);
    tokendingsIssuerName = tokendingsIssuer.metadata.issuer;
    try {
        tokendingsClient = new tokendingsIssuer.Client(
            {
                client_id: config.clientId,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            {
                keys: [JSON.parse(config.jwk)],
            }
        );
    } catch (err) {
        log.error('Kunne ikke opprette tokendingsClient ' + err);
    }
};
