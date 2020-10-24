const request = require('supertest')
const server = require('../../src/server')

const mockRequest = {
    query: {
        start_date: '1997-07-16T19:20:30.45',
        end_date: '1997-07-16T19:20:30.45',
        frequency: 'WEEKLY',
        weekly_rent: 415,
    },
}

describe('Get Ledger Endpoints - Happypath', () => {
    it('should return ledger details', async () => {
        const res = await request(server)
            .get('/v1/ledger')
            .query({
                start_date: '1997-07-16T19:20:30.45',
                end_date: '1997-07-16T19:20:30.45',
                frequency: 'WEEKLY',
                weekly_rent: 415,
            })
            .send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })
})

describe('Get Ledger Endpoints - Validation error', () => {
    it('should return ledger details', async () => {
        const res = await request(server)
            .get('/v1/ledger')
            .query({
                start_date: '1997-07-16T19:20:30.45',
                end_date: '1997-07-16T19:20:30.45',
                weekly_rent: 415,
            })
            .send()
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual(
            'Missing or invalid required parameters'
        )
    })
})
