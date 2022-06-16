import React, { FunctionComponent, ReactNode } from 'react';
import { Alert, BodyLong, Heading, Loader } from '@navikt/ds-react';
import { Respons, Status } from '../api/api';
import './Informasjon.less';

const Tittel = ({ children }: { children: ReactNode }) => (
    <Heading level="2" size="small" className="informasjon__tittel">
        {children}
    </Heading>
);

const Tekst = ({ children }: { children: ReactNode }) => (
    <BodyLong className="informasjon__tekst">{children}</BodyLong>
);

const BehovForTilrettelegging = () => (
    <Alert variant="info" className="informasjon">
        <Tittel>Du har behov for tilrettelegging</Tittel>
        <Tekst>
            Veilederen din har registrert at du har behov for tilrettelegging for å kunne jobbe.
            Mange arbeidsgivere har mulighet til å tilpasse arbeidshverdagen din.
        </Tekst>
    </Alert>
);

const IngenBehovForTilrettelegging = () => (
    <Alert variant="info" className="informasjon">
        <Tittel>Du har ikke behov for tilrettelegging</Tittel>
        <Tekst>
            Vi har ikke registrert at du har behov for tilrettelegging for å kunne jobbe. Mange
            arbeidsgivere kan tilrettelegge arbeidshverdagen eller gjøre andre tiltak.
        </Tekst>
    </Alert>
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
                <Loader />
            </div>
        );
    } else if (respons.status === Status.Suksess) {
        return <BehovForTilrettelegging />;
    } else if (respons.status === Status.Feil && respons.statusKode === 404) {
        return <IngenBehovForTilrettelegging />;
    } else if (respons.status === Status.Feil || respons.status === Status.UkjentFeil) {
        return (
            <Alert variant="error" className="informasjon">
                <Tekst>Det skjedde dessverre en feil, vennligst prøv igjen senere.</Tekst>
            </Alert>
        );
    } else {
        return null;
    }
};

export default Informasjon;
