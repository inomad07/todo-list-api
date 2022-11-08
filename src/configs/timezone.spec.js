const setTimezone = require('./timezone')

describe('Timezones', () => {
    it('should always be UTC', async () => {
        const data = await setTimezone();
        expect(data).toBe('UTC');
    });
});