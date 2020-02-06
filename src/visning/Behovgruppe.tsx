import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Alternativtekster } from '../api/Behovtekster';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Alternativtekster[];
}

const behovliste = (behov: Alternativtekster[]) => {
    return behov.map(_ => (
        <li key={_.label}>
            <Normaltekst>{_.label}</Normaltekst>
        </li>
    ));
};

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    return (
        <section className="visning__behovgruppe">
            <Element>{overskrift}</Element>
            <Normaltekst>{beskrivelse}</Normaltekst>
            <ul className="visning__behovliste">
                {behov.length ? (
                    behovliste(behov)
                ) : (
                    <li>
                        <Normaltekst className="visning__ingenbehov">
                            Ingen registrerte behov
                        </Normaltekst>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default Behovgruppe;
