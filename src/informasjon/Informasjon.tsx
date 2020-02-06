import React, { FunctionComponent, ReactNode } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './Informasjon.less';

export enum Situasjon {
    HarBehovForTilrettelegging,
    HarIngenBehovForTilrettelegging,
    ErIkkeUnderOppfølging,
}

const BehovForTilrettelegging = () => (
    <>
        <Element tag="h3">Du har behov for tilrettelegging</Element>
        <Normaltekst>
            Veilederen din har registrert at du har behov for tilrettelegging for å kunne jobbe.
            Mange arbeidsgivere har mulighet til å tilpasse arbeidshverdagen din.
        </Normaltekst>
    </>
);

const IngenBehovForTilrettelegging = () => (
    <>
        <Element tag="h3">Du har ikke behov for tilrettelegging</Element>
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
        <Element tag="h3">Du er ikke registrert som arbeidssøker hos NAV</Element>
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

    return <AlertStripeInfo className="informasjon">{hentInnhold()}</AlertStripeInfo>;
};

export default Informasjon;
