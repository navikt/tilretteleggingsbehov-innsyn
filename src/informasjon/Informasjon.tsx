import React, { FunctionComponent, ReactNode } from 'react';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './Informasjon.less';
import { Respons, Status } from '../api/api';
import NavFrontendSpinner from 'nav-frontend-spinner';

const Tittel = ({ children }: { children: ReactNode }) => (
    <Element tag="h3" className="informasjon__tittel">
        {children}
    </Element>
);

const Tekst = ({ children }: { children: ReactNode }) => (
    <Normaltekst className="informasjon__tekst">{children}</Normaltekst>
);

const BehovForTilrettelegging = () => (
    <AlertStripeInfo className="informasjon">
        <Tittel>Du har behov for tilrettelegging</Tittel>
        <Tekst>
            Veilederen din har registrert at du har behov for tilrettelegging for å kunne jobbe.
            Mange arbeidsgivere har mulighet til å tilpasse arbeidshverdagen din.
        </Tekst>
    </AlertStripeInfo>
);

const IngenBehovForTilrettelegging = () => (
    <AlertStripeInfo className="informasjon">
        <Tittel>Du har ikke behov for tilrettelegging</Tittel>
        <Tekst>
            Vi har ikke registrert at du har behov for tilrettelegging for å kunne jobbe. Mange
            arbeidsgivere kan tilrettelegge arbeidshverdagen eller gjøre andre tiltak.
        </Tekst>
        <Tekst>
            <span>Har du behov for tilrettelegging? </span>
            <Lenke href="https://aktivitetsplan.nav.no/dialog">
                Ta kontakt med veilederen din.
            </Lenke>
        </Tekst>
    </AlertStripeInfo>
);

const IkkeUnderOppfølging = () => (
    <AlertStripeInfo className="informasjon">
        <Tittel>Du er ikke registrert som arbeidssøker hos NAV</Tittel>
        <Tekst>Behov for tilrettelegging for å kunne jobbe er derfor ikke registrert.</Tekst>
    </AlertStripeInfo>
);

type Props = {
    respons: Respons;
};

const Informasjon: FunctionComponent<Props> = ({ respons }) => {
    const lasterInn = respons.status === Status.LasterInn;
    const ikkeAutentisert = respons.status === Status.Feil && respons.statusKode === 401;

    if (lasterInn || ikkeAutentisert) {
        return (
            <div className="app__spinner">
                <NavFrontendSpinner />
            </div>
        );
    } else if (respons.status === Status.Suksess) {
        return <BehovForTilrettelegging />;
    } else if (respons.status === Status.Feil && respons.statusKode === 404) {
        return <IngenBehovForTilrettelegging />;
    } else if (respons.status === Status.Feil && respons.statusKode === 400) {
        return <IkkeUnderOppfølging />;
    } else if (respons.status === Status.Feil || respons.status === Status.UkjentFeil) {
        return (
            <AlertStripeFeil className="informasjon">
                <Tekst>Det skjedde dessverre en feil, vennligst prøv igjen senere.</Tekst>
            </AlertStripeFeil>
        );
    } else {
        return null;
    }
};

export default Informasjon;
