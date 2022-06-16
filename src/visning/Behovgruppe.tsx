import React, { FunctionComponent } from 'react';
import { Behovtekst } from '../api/tilretteleggingsbehov';
import { BodyShort, Heading } from '@navikt/ds-react';
import visningCss from './Visning.module.css';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    if (behov.length === 0) return null;
    return (
        <section className={visningCss.behovgruppe}>
            <Heading level="3" size="small">
                {overskrift}
            </Heading>
            <BodyShort>{beskrivelse}</BodyShort>
            <ul className={visningCss.behovliste}>
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
