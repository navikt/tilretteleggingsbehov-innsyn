import { Arbeidshverdagen, Arbeidstid, Fysisk, UtfordringerMedNorsk } from './Behov';

export interface Kandidat {
    aktørId: string;
    fnr: string;
    sistEndretAvVeileder: string;
    sistEndretAv: string;
    arbeidstid: Arbeidstid[];
    fysisk: Fysisk[];
    arbeidshverdagen: Arbeidshverdagen[];
    utfordringerMedNorsk: UtfordringerMedNorsk[];
}

export interface Oppfølgingsstatus {
    underOppfolging: boolean;
}
