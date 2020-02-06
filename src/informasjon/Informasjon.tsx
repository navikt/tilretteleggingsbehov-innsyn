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

const Tittel = ({ children }: { children: ReactNode }) => (
    <Element tag="h3" className="informasjon__tittel">
        {children}
    </Element>
);

const Tekst = ({ children }: { children: ReactNode }) => (
    <Normaltekst className="informasjon__tekst">{children}</Normaltekst>
);

const BehovForTilrettelegging = () => (
    <>
        <Tittel>Du har behov for tilrettelegging</Tittel>
        <Tekst>
            Veilederen din har registrert at du har behov for tilrettelegging for å kunne jobbe.
            Mange arbeidsgivere har mulighet til å tilpasse arbeidshverdagen din.
        </Tekst>
    </>
);

const IngenBehovForTilrettelegging = () => (
    <>
        <Tittel>Du har ikke behov for tilrettelegging</Tittel>
        <Tekst>
            Vi har ikke registrert at du har behov for tilrettelegging for å kunne jobbe. Mange
            arbeidsgivere kan tilrettelegge arbeidshverdagen eller gjøre andre tiltak.
        </Tekst>
        <Tekst>
            <span>Har du behov for tilrettelegging? </span>
            <Lenke href="#kontakt-veileder">Ta kontakt med veilederen din.</Lenke>
        </Tekst>
    </>
);

const IkkeUnderOppfølging = () => (
    <>
        <Tittel>Du er ikke registrert som arbeidssøker hos NAV</Tittel>
        <Tekst>Behov for tilrettelegging for å kunne jobbe er derfor ikke registrert.</Tekst>
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
