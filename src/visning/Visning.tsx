import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent } from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { Kandidat } from '../api/Kandidat';
import {
    arbeidshverdagenTekster,
    arbeidstidTekster,
    fysiskTekster,
    utfordringerMedNorskTekster,
} from '../api/Behovtekster';
import './Visning.less';
import lenker from '../lenker';

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
                    behov={arbeidstidTekster(kandidat.arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.fysisk)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={arbeidshverdagenTekster(kandidat.arbeidshverdagen)}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Du har utfordringer med å:"
                    behov={utfordringerMedNorskTekster(kandidat.utfordringerMedNorsk)}
                />
            </div>
            <Element tag="h3">Stemmer ikke informasjonen?</Element>
            <Normaltekst>
                <span>Mener du at behovene dine for tilrettelegging ikke er riktig? </span>
                <Lenke href={lenker.kontaktVeileder}>Ta kontakt med veilederen din.</Lenke>
            </Normaltekst>
        </div>
    );
};

export default Visning;
