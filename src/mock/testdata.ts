import { Kandidat } from '../api/Kandidat';
import { Arbeidstid, FysiskTilrettelegging, UtfordringerMedNorsk } from '../api/Behov';

export const etFnr = '00000000000';

export const enKandidat: Kandidat = {
    aktørId: '1234567891011',
    fnr: etFnr,
    sistEndret: new Date().toISOString(),
    sistEndretAv: 'X123456',
    navKontor: '1001',
    arbeidstidBehov: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysiskeBehov: [FysiskTilrettelegging.Arbeidsstilling],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [UtfordringerMedNorsk.Skrive, UtfordringerMedNorsk.Lese],
};

export const enOppfølgingsstatus = {
    underOppfolging: true,
};
