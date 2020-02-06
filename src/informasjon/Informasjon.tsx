import React, { FunctionComponent, ReactNode } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

export enum Situasjon {
    HarBehovForTilrettelegging,
    HarIngenBehovForTilrettelegging,
    ErIkkeUnderOppfølging,
}

const BehovForTilrettelegging = () => (
    <>
        <h2>Du har behov for tilrettelegging</h2>
        <Normaltekst>
            Veilederen din har registrert at du har behov for tilrettelegging for å kunne jobbe.
            Mange arbeidsgivere har mulighet til å tilpasse arbeidshverdagen din.
        </Normaltekst>
    </>
);

const IngenBehovForTilrettelegging = () => (
    <>
        <h2>Du har ikke behov for tilrettelegging</h2>
        <Normaltekst>
            Vi har ikke registrert at du har behov for tilrettelegging for å kunne jobbe. Mange
            arbeidsgivere kan tilrettelegge arbeidshverdagen eller gjøre andre tiltak.
        </Normaltekst>
        <Normaltekst>
            <span>Har du behov for tilrettelegging? </span>
            <Lenke href="#kontakt-veileder">Ta kontakt med veilederen din.</Lenke>
        </Normaltekst>
    </>
);

const IkkeUnderOppfølging = () => (
    <>
        <h2>Du er ikke registrert som arbeidssøker hos NAV</h2>
        <Normaltekst>
            Behov for tilrettelegging for å kunne jobbe er derfor ikke registrert.
        </Normaltekst>
    </>
);

type Props = {
    situasjon: Situasjon;
};

const Informasjon: FunctionComponent<Props> = ({ situasjon }) => {
    const hentInnhold = (): ReactNode => {
        switch (situasjon) {
            case Situasjon.HarBehovForTilrettelegging:
                return <BehovForTilrettelegging />;
            case Situasjon.HarIngenBehovForTilrettelegging:
                return <IngenBehovForTilrettelegging />;
            case Situasjon.ErIkkeUnderOppfølging:
                return <IkkeUnderOppfølging />;
        }
    };

    return <AlertStripeInfo>{hentInnhold()}</AlertStripeInfo>;
};

export default Informasjon;
