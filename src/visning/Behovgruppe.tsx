import React, { FunctionComponent } from 'react';
import { Behovtekst } from '../api/tilretteleggingsbehov';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    if (behov.length === 0) return null;
    return (
        <section className="visning__behovgruppe">
            <Heading level="3" size="small">
                {overskrift}
            </Heading>
            <BodyShort>{beskrivelse}</BodyShort>
            <ul className="visning__behovliste">
                {behov.map((b) => (
                    <li key={b.beskrivelse}>
                        <BodyShort>{b.beskrivelse}</BodyShort>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Behovgruppe;
