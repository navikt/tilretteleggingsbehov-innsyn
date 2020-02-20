import { Kandidat } from '../api/Kandidat';
import { Arbeidstid, Fysisk, UtfordringerMedNorsk } from '../api/Behov';

export const etFnr = '00000000000';

export const enKandidat: Kandidat = {
    aktørId: '1234567891011',
    fnr: etFnr,
    sistEndretAvVeileder: new Date().toISOString(),
    sistEndretAv: 'X123456',
    navKontor: '1001',
    arbeidstid: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysisk: [Fysisk.Arbeidsstilling],
    arbeidshverdagen: [],
    utfordringerMedNorsk: [UtfordringerMedNorsk.Skrive, UtfordringerMedNorsk.Lese],
};

export const enOppfølgingsstatus = {
    underOppfolging: true,
};
