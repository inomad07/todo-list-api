require('dotenv').config({ path: '.env' });
const { getOptionUri, getConnectionUri } = require('./helper');


describe('Helper', () => {
    it('It should return Option URI', () => {
        const hostUri = getOptionUri();
        const options = 'authSource=admin';
        expect(hostUri).toBe(options);
    });

    it('It should return Connection URI', () => {
        const hostUri = getConnectionUri();
        const host = 'localhost:27017';
        expect(hostUri).toBe(host);
    });
});

