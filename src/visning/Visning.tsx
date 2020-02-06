import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent } from 'react';

import {
    arbeidstidTekster,
    fysiskTekster,
    grunnleggendeTekster,
    arbeidsmiljøTekster,
} from '../api/Behovtekster';

import './Visning.less';
import { Kandidat } from '../api/Kandidat';

interface Props {
    kandidat: Kandidat;
}

const Visning: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <div className="visning">
            <h2>Behovene som er registrert:</h2>
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
        </div>
    );
};

export default Visning;
