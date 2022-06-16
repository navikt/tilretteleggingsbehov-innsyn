import React, { FunctionComponent } from 'react';
import { BodyLong, Heading, Link } from '@navikt/ds-react';

import { hentTeksterForValgteBehov } from '../api/tilretteleggingsbehov';
import { Kandidat } from '../api/Kandidat';
import Behovgruppe from './Behovgruppe';
import lenker from '../lenker';
import { Kategori } from '../api/Behov';
import './Visning.less';
import { Dialog } from '@navikt/ds-icons';

interface Props {
    kandidat: Kandidat;
}

const Visning: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <div className="visning">
            <Heading level="2" size="medium">
                Behovene som er registrert:
            </Heading>
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
            <Heading level="3" size="small">
                Stemmer ikke informasjonen?
            </Heading>
            <BodyLong>
                <span>Mener du at behovene dine for tilrettelegging ikke er riktig? </span>
                <Link href={lenker.kontaktVeileder}>
                    Ta kontakt med veilederen din.
                    <Dialog />
                </Link>
            </BodyLong>
        </div>
    );
};

export default Visning;
