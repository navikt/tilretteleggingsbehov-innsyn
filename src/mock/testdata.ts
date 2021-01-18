import { Kandidat } from '../api/Kandidat';
import { Arbeidshverdagen, Fysisk, Arbeidstid, UtfordringerMedNorsk } from '../api/Behov';

export const etFnr = '00000000000';

export const enKandidat: Kandidat = {
    aktørId: '1234567891011',
    fnr: etFnr,
    sistEndretAvVeileder: new Date().toISOString(),
    sistEndretAv: 'X123456',
    arbeidstid: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysisk: [Fysisk.Arbeidsstilling, Fysisk.UniversellUtforming],
    arbeidshverdagen: [Arbeidshverdagen.PersonligBistand],
    utfordringerMedNorsk: [UtfordringerMedNorsk.Skrive, UtfordringerMedNorsk.Lese],
};

export const enOppfølgingsstatus = {
    underOppfolging: true,
};
