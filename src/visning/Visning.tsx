import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent } from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { Kandidat } from '../api/Kandidat';
import {
    arbeidstidTekster,
    fysiskTekster,
    grunnleggendeTekster,
    arbeidsmiljøTekster,
} from '../api/Behovtekster';
import './Visning.less';

interface Props {
    kandidat: Kandidat;
}

const Visning: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <div className="visning">
            <Undertittel className="visning__undertittel">Behovene som er registrert:</Undertittel>
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    behov={arbeidstidTekster(kandidat.arbeidstidBehov)}
                />
                <Behovgruppe
                    overskrift="Arbeidsmiljø"
                    beskrivelse="Behov for tilpasninger av arbeidsmiljøet"
                    behov={arbeidsmiljøTekster(kandidat.arbeidsmiljøBehov)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.fysiskeBehov)}
                />
                <Behovgruppe
                    overskrift="Grunnleggende ferdigheter"
                    beskrivelse="Kandidaten har utfordringer med:"
                    behov={grunnleggendeTekster(kandidat.grunnleggendeBehov)}
                />
            </div>
            <Element tag="h3">Stemmer ikke informasjonen?</Element>
            <Normaltekst>
                <span>Mener du at behovene dine for tilrettelegging ikke er riktig? </span>
                <Lenke href="#kontakt-veileder">Ta kontakt med veilederen din.</Lenke>
            </Normaltekst>
        </div>
    );
};

export default Visning;
