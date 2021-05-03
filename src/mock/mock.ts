import fetchMock from 'fetch-mock';
import { enKandidat } from './testdata';

const basePath = '/person/behov-for-tilrettelegging';

fetchMock.get(`${basePath}/tilretteleggingsbehov`, enKandidat);
