import { Client, Issuer } from 'openid-client';
import { Session } from 'express-session';

const discoveryUrl = process.env.IDPORTEN_WELL_KNOWN_URL!;
const clientId = process.env.IDPORTEN_CLIENT_ID!;
const redirectUri = process.env.IDPORTEN_REDIRECT_URI!;
const jwk = process.env.IDPORTEN_CLIENT_JWK!;
const idPortenScope = 'openid profile';

let idportenClient: Client;

export const init = async () => {
    const idportenIssuer = await Issuer.discover(discoveryUrl);
    idportenClient = new idportenIssuer.Client(
        {
            client_id: clientId,
            token_endpoint_auth_method: 'private_key_jwt',
            token_endpoint_auth_signing_alg: 'RS256',
            redirect_uris: [redirectUri, 'http://localhost:3000/callback'],
            response_types: ['code'],
        },
        {
            keys: [JSON.parse(jwk)],
        }
    );
};

export const authUrl = (session: Session, nonce: string, state: string) =>
    idportenClient.authorizationUrl({
        scope: idPortenScope,
        redirect_uri: redirectUri,
        response_type: 'code',
        response_mode: 'query',
        nonce,
        state,
        resource: 'https://nav.no',
        acr_valus: 'Level4',
    });
