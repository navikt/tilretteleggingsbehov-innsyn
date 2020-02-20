import { Arbeidshverdagen, Arbeidstid, FysiskTilrettelegging, UtfordringerMedNorsk } from './Behov';

export interface Kandidat {
    aktørId: string;
    fnr: string;
    sistEndret: string;
    sistEndretAv: string;
    navKontor: string;
    arbeidstidBehov: Arbeidstid[];
    fysiskeBehov: FysiskTilrettelegging[];
    arbeidsmiljøBehov: Arbeidshverdagen[];
    grunnleggendeBehov: UtfordringerMedNorsk[];
}

export interface Oppfølgingsstatus {
    underOppfolging: boolean;
}
