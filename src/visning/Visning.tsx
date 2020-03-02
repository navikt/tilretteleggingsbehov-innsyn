import React, { FunctionComponent } from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { hentTeksterForBehov } from '../api/Behovtekster';
import { Kandidat } from '../api/Kandidat';
import { Kategori } from '../api/Kategori';
import Behovgruppe from './Behovgruppe';
import lenker from '../lenker';
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
                    behov={hentTeksterForBehov(kandidat.arbeidstid, Kategori.Arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={hentTeksterForBehov(kandidat.fysisk, Kategori.Fysisk)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={hentTeksterForBehov(
                        kandidat.arbeidshverdagen,
                        Kategori.Arbeidshverdagen
                    )}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Du har utfordringer med å:"
                    behov={hentTeksterForBehov(
                        kandidat.utfordringerMedNorsk,
                        Kategori.UtfordringerMedNorsk
                    )}
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
