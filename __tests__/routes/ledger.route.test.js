const request = require('supertest')
const server = require('../../src/server')

/**
 * Sample token for testing
 */
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmluZHUiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjAzNjQyODI1fQ.57_ocOamlcGEEKHnn3iZkIMYEYLretDJOhfSF0eHT3U'

describe('Ledger details GET Endpoint', () => {
    /**
     * Should return an authentication error when authorization header is not provided
     */
    it('should return authentication error', async () => {
        const res = await request(server)
            .get('/v1/ledger')
            .query({
                start_date: '1997-07-16T19:20:30.45',
                end_date: '1997-07-16T19:20:30.45',
                frequency: 'WEEKLY',
                weekly_rent: 415,
            })
            .send()
        expect(res.statusCode).toEqual(401)
        expect(res.body.message).toEqual('Authorization header required')
    }),
        /**
         * Should return a forbidden error when the token is invalid
         */
        it('should return forbidden error', async () => {
            const res = await request(server)
                .get('/v1/ledger')
                .query({
                    start_date: '1997-07-16T19:20:30.45',
                    end_date: '1997-07-16T19:20:30.45',
                    frequency: 'WEEKLY',
                    weekly_rent: 415,
                })
                .send()
                .set('Authorization', 'Bearer ')
            expect(res.statusCode).toEqual(403)
            expect(res.body.message).toEqual('Forbidden')
        }),
        /**
         * Should return a validation error when the given parameters are incorrect
         */
        it('should return validation error', async () => {
            const res = await request(server)
                .get('/v1/ledger')
                .query({
                    start_date: '1997-07-16T19:20:30.45',
                    end_date: '1997-07-16T19:20:30.45',
                    weekly_rent: 415,
                })
                .set('Authorization', `Bearer ${token}`)
                .send()
            expect(res.statusCode).toEqual(400)
            expect(res.body.message).toEqual(
                'Missing or invalid required parameters'
            )
        })
    /**
     * Should returns an array of ledger details for a validated request
     */
    it('should return ledger details', async () => {
        const res = await request(server)
            .get('/v1/ledger')
            .query({
                start_date: '1997-07-16T19:20:30.45',
                end_date: '1997-07-16T19:20:30.45',
                frequency: 'WEEKLY',
                weekly_rent: 415,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })
})
