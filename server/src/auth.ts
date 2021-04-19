import { Client, Issuer } from 'openid-client';

const discoveryUrl = process.env.IDPORTEN_WELL_KNOWN_URL!;
const clientId = process.env.IDPORTEN_CLIENT_ID!;
const redirectUri = process.env.IDPORTEN_REDIRECT_URI!;
const jwk = process.env.IDPORTEN_CLIENT_JWK!;

let idportenClient: Issuer<Client> | undefined;

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
