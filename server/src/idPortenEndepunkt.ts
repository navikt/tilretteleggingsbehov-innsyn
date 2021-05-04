import { Response } from 'express';
import { generators, TokenSet } from 'openid-client';
import * as idPortenClient from './idPortenClient';
import { log } from './logging';
import { BASE_PATH } from './server';
import { RequestMedSession } from './session';

export const loginHosIdPorten = (req: RequestMedSession, res: Response) => {
    const nonce = generators.nonce();
    const state = generators.state();
    req.session.nonce = nonce;
    req.session.state = state;

    res.redirect(idPortenClient.getAuthorizationUrl(nonce, state));
};

export const sikreAtErLoggetInnHosIdPorten = async (
    req: RequestMedSession,
    res: Response,
    next: () => void
) => {
    let currentTokens = req.session.tokenSet;

    if (!currentTokens) {
        res.redirect(`${BASE_PATH}/login`);
    } else {
        const currentTokenSet = new TokenSet(currentTokens);

        if (currentTokenSet.expired() && currentTokenSet.refresh_token) {
            try {
                const oppdatertTokenSet = await idPortenClient.oppdaterToken(
                    currentTokenSet.refresh_token
                );
                req.session.tokenSet = new TokenSet(oppdatertTokenSet);
            } catch (error) {
                log.error('Kunne ikke oppdatere utløpt token:', error);
                req.session.destroy((error) => {
                    log.error('Klarte ikke å slette utløpt token:', error);
                });

                res.redirect(`${BASE_PATH}/login`);
            }
        } else {
            next();
        }
    }
};

export const idPortenCallbackEndepunkt = async (req: RequestMedSession, res: Response) => {
    try {
        const session = req.session;
        const tokenSet = await idPortenClient.getTokenSet(req);

        session.nonce = null;
        session.state = null;
        session.tokenSet = tokenSet;

        res.cookie('tilretteleggingsbehov-innsyn-id-token', tokenSet.id_token, {
            secure: true,
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000, // 2 timer
        });

        res.redirect(BASE_PATH);
    } catch (error) {
        log.error('Kunne ikke hente token set', error);
    }
};
