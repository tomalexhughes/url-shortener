import nock from 'nock';
import apiRequest from '.';

describe('API Request Helper', () => {
    it('should work when endpoint is passed both with and without a leading /', async () => {
        const json = { key: 'value' };
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .twice()
            .reply(200, json);

        const values = [
            await apiRequest({
                endpoint: 'shorten',
                method: 'POST'
            }),
            await apiRequest({
                endpoint: '/shorten',
                method: 'POST'
            })
        ];

        expect(values).toEqual([json, json]);
    });

    it('should reject if the response is not ok', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});

        await expect(
            apiRequest({
                endpoint: 'shorten',
                method: 'POST'
            })
        ).rejects.toEqual({});
    });
});
