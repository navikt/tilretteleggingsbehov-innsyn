import fetchMock from 'fetch-mock';

const basePath = '/person/behov-for-tilrettelegging';

fetchMock.get(`${basePath}/api/me`, 'X123456');
