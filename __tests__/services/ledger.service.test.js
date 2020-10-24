const moment = require('moment')

const ledgerService = require('../../src/services/ledger.service')
const { BadRequestError } = require('../../src/util/errors')

describe('Happypath - Weekly', () => {
    const param = {
        startDate: '2020-03-28T19:20:30.45',
        endDate: '2020-05-27T19:20:30.45',
        frequency: 'WEEKLY',
        weeklyRent: 555,
    }

    const result = ledgerService.getLedger(param)
    it('should test that returns an array', () => {
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(9)
        expect(moment(result[0].startDate).format('YYYY-MM-DD')).toBe(
            '2020-03-28'
        )
        expect(moment(result[0].endDate).format('YYYY-MM-DD')).toBe(
            '2020-04-03'
        )
        expect(result[0].amount).toBe(555)
    })
})

describe('Unhappypath', () => {
    const param = {
        startDate: '2020-03-28T19:20:30.45',
        endDate: '2020-05-27T19:20:30.45',
        frequency: 'YEARLY',
        weeklyRent: 555,
    }

    it('should test that returns an error', () => {
        expect(() => ledgerService.getLedger(param)).toThrow(BadRequestError)
    })
})
