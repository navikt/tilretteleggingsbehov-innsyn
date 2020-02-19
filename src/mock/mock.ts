import fetchMock from 'fetch-mock';
import { enKandidat, enOppfølgingsstatus } from './testdata';

const basePath = '/person/behov-for-tilrettelegging';

fetchMock
    .get(`${basePath}/tilretteleggingsbehov`, enKandidat)
    .get(`${basePath}/oppfolgingsstatus`, enOppfølgingsstatus);
