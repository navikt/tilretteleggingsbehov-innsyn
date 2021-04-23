import { Client, Issuer, TokenSet } from 'openid-client';
import { log } from './logging';
import { RequestMedSession } from './server';

let idportenClient: Client;
let idportenIssuerName: String;

const idPortenConfig = {
    discoveryUrl: process.env.IDPORTEN_WELL_KNOWN_URL!,
    clientId: process.env.IDPORTEN_CLIENT_ID!,
    redirectUri: process.env.IDPORTEN_REDIRECT_URI!,
    jwk: process.env.IDPORTEN_CLIENT_JWK!,
};

export const initIdPortenIssuer = async () => {
    const idportenIssuer = await Issuer.discover(idPortenConfig.discoveryUrl);
    idportenIssuerName = idportenIssuer.metadata.issuer;
    try {
        idportenClient = new idportenIssuer.Client(
            {
                client_id: idPortenConfig.clientId,
                token_endpoint_auth_method: 'private_key_jwt',
                token_endpoint_auth_signing_alg: 'RS256',
                redirect_uris: [
                    idPortenConfig.redirectUri,
                    'http://localhost:3000/oauth2/callback',
                ],
                response_types: ['code'],
            },
            {
                keys: [JSON.parse(idPortenConfig.jwk)],
            }
        );
    } catch (err) {
        log.error('Kunne ikke opprette idportenClient ' + err);
    }
};

export const authUrl = (nonce: string, state: string) => {
    const sikkerhetsnivå = 'Level4';

    return idportenClient.authorizationUrl({
        scope: 'openid profile',
        redirect_uri: idPortenConfig.redirectUri,
        response_type: 'code',
        response_mode: 'query',
        nonce,
        state,
        resource: 'https://nav.no',
        acr_values: sikkerhetsnivå,
    });
};

export const getIdPortenTokenSet = async (req: RequestMedSession): Promise<TokenSet> => {
    const params = idportenClient.callbackParams(req);
    const nonce = req.session.nonce!;
    const state = req.session.state!;
    const additionalClaims = {
        clientAssertionPayload: {
            aud: idportenIssuerName,
        },
    };

    return await idportenClient.callback(
        idPortenConfig.redirectUri,
        params,
        { nonce, state },
        additionalClaims
    );
};

export const oppdaterToken = async (refreshToken: string) => {
    const additionalClaims = {
        clientAssertionPayload: {
            aud: idportenIssuerName,
        },
    };

    return await idportenClient.refresh(refreshToken, additionalClaims);
};
