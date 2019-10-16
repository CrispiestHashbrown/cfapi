const authHeaderParser = require('../helpers/AuthHeaderParser');

describe('AuthHeaderParser', () => {
    const validAuthHeader = 'bearer someToken';
    const invalidAuthHeader = 'someToken';

    it('should return the token if the header begins with the bearer authorization type', () => {
        expect(authHeaderParser(validAuthHeader)).toEqual('someToken');
    });

    it(`should return an empty string if the header does not begin with the bearer authorization 
    type`, () => {
        expect(authHeaderParser(invalidAuthHeader)).toEqual('');
    });
});