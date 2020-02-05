import fetchMock from 'fetch-mock';

const basePath = '/tilretteleggingsbehov-innsyn';

fetchMock.get(`${basePath}/api/me`, 'X123456');
