export const idPortenConfig = {
    discoveryUrl: process.env.IDPORTEN_WELL_KNOWN_URL!,
    clientId: process.env.IDPORTEN_CLIENT_ID!,
    redirectUri: process.env.IDPORTEN_REDIRECT_URI!,
    jwk: process.env.IDPORTEN_CLIENT_JWK!,
    scope: 'openid profile',
};
