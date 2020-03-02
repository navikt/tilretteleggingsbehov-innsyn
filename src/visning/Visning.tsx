import React, { FunctionComponent } from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { hentTeksterForValgteBehov } from '../api/tilretteleggingsbehov';
import { Kandidat } from '../api/Kandidat';
import Behovgruppe from './Behovgruppe';
import lenker from '../lenker';
import './Visning.less';
import { Kategori } from '../api/Behov';

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
                    behov={hentTeksterForValgteBehov(Kategori.Arbeidstid, kandidat.arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={hentTeksterForValgteBehov(Kategori.Fysisk, kandidat.fysisk)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={hentTeksterForValgteBehov(
                        Kategori.Arbeidshverdagen,
                        kandidat.arbeidshverdagen
                    )}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Du har utfordringer med å:"
                    behov={hentTeksterForValgteBehov(
                        Kategori.UtfordringerMedNorsk,
                        kandidat.utfordringerMedNorsk
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
