const queryParser = require('../helpers/QueryParser');

describe('QueryParser', () => {
    const urlWithQueryString = 'https://github.com/login/oauth/authorize?client_id=someClientId&state=someStateString';
    const urlWithoutQueryString = 'https://github.com/login/oauth/authorize';

    it('should return the query string if it exists', () => {
        expect(queryParser(urlWithQueryString)).toEqual('?client_id=someClientId&state=someStateString');
    });

    it('should return an empty string if there is no query string', () => {
        expect(queryParser(urlWithoutQueryString)).toEqual('');
    });
});