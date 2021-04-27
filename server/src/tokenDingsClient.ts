import { Client, Issuer, TokenSet } from 'openid-client';
import { log } from './logging';
import { SessionMedTokenSet } from './session';

let tokendingsClient: Client;
let tokendingsIssuerName: String;

const config = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL!,
    clientId: process.env.TOKEN_X_CLIENT_ID!,
    jwk: process.env.TOKEN_X_PRIVATE_JWK!,
};

export const init = async () => {
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

export const tokenSetSessionKey = 'finn-kandidat-api_token-set';

export const getAccessToken = async (session: SessionMedTokenSet): Promise<string> => {
    const cachedTokenSetString = session[tokenSetSessionKey];

    if (cachedTokenSetString) {
        const tokenSet = new TokenSet(cachedTokenSetString);
        if (!tokenSet.expired() && tokenSet.access_token) {
            return tokenSet.access_token;
        }
    }

    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
        },
    };

    try {
        const tokenSet = await tokendingsClient.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: process.env.FINN_KANDIDAT_API_CLIENT_ID,
                subject_token: session.tokenSet?.access_token,
            },
            additionalClaims
        );

        if (tokenSet.access_token) {
            session[tokenSetSessionKey] = tokenSet;

            return tokenSet.access_token;
        } else {
            log.info('Ingen access_token i svar fra TokenDings');
            throw new Error('Ingen access_token i svar fra TokenDings');
        }
    } catch (e) {
        log.info('Kunne ikke hente token fra TokenDings', e);
        throw new Error('Kunne ikke få svar fra TokenDings');
    }
};
