import { Kandidat } from './Kandidat';
import fetchMock from 'fetch-mock';
import { FysiskBehov } from './Behov';

const basePath = '/person/behov-for-tilrettelegging';

const kandidat: Kandidat = {
    aktørId: '1234567891011',
    fnr: '00000000000',
    sistEndret: new Date().toISOString(),
    sistEndretAv: 'X123456',
    navKontor: '1001',
    arbeidstidBehov: [],
    fysiskeBehov: [FysiskBehov.TungeLøft],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const oppfølgingsstatus = {
    underOppfolging: true,
};

fetchMock
    .get(`${basePath}/tilretteleggingsbehov`, kandidat)
    .get(`${basePath}/oppfolgingsstatus`, oppfølgingsstatus);
