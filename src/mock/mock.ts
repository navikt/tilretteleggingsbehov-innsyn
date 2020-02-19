import fetchMock from 'fetch-mock';
import { enKandidat } from './testdata';

const basePath = '/person/behov-for-tilrettelegging';

export const oppfølgingsstatus = {
    underOppfolging: true,
};

fetchMock
    .get(`${basePath}/tilretteleggingsbehov`, enKandidat)
    .get(`${basePath}/oppfolgingsstatus`, oppfølgingsstatus);
