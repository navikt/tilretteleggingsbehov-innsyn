import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Behovtekst } from '../api/tilretteleggingsbehov';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    if (behov.length === 0) return null;
    return (
        <section className="visning__behovgruppe">
            <Element tag="h3">{overskrift}</Element>
            <Normaltekst>{beskrivelse}</Normaltekst>
            <ul className="visning__behovliste">
                {behov.map(b => (
                    <li key={b.beskrivelse}>
                        <Normaltekst>{b.beskrivelse}</Normaltekst>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Behovgruppe;
