const moment = require('moment')

const BadRequestError = require('../util/errors/BadRequestError')

const frequencyConfig = {
    WEEKLY: {
        type: 'days',
        value: 7,
        numberOfAmountTimes: 1,
    },
    FORTNIGHT: {
        type: 'days',
        value: 14,
        numberOfAmountTimes: 2,
    },
    MONTHLY: {
        type: 'Months',
        value: 1,
        numberOfAmountTimes: 365 / (12 * 7),
    },
}

module.exports = {
    getLedger: (requestParam) => {
        const {
            startDate: startDateISO,
            endDate: endDateISO,
            frequency,
            weeklyRent,
        } = requestParam

        const startDate = moment(startDateISO)
        const endDate = moment(endDateISO)

        let ledgerDetails = []

        const frequencyDetails = frequencyConfig[frequency.toUpperCase()]

        if (!frequencyDetails) {
            throw new BadRequestError(
                'Invalid frequency type provided',
                frequency
            )
        }

        let iterator = 1
        let tempStartDate = startDate
        let tempEndDate = startDate

        // Loop while the ledger record end date is less than the provided end date
        while (
            startDate
                .clone()
                .add(
                    frequencyDetails.value * iterator,
                    frequencyDetails.type
                ) <= endDate
        ) {
            tempEndDate = startDate
                .clone()
                .add(frequencyDetails.value * iterator, frequencyDetails.type)

            ledgerDetails.push({
                startDate: tempStartDate,
                endDate: tempEndDate.clone().subtract(1, 'days'),
                amount: weeklyRent * frequencyDetails.numberOfAmountTimes,
            })

            tempStartDate = tempEndDate.clone()
            iterator++
        }

        // If the last date from frequency loop is less than the provided enddate do necessary
        if (
            endDate.diff(tempEndDate.clone().subtract(1, 'days'), 'days') >= 0
        ) {
            ledgerDetails.push({
                startDate: tempEndDate.clone(),
                endDate,
                weeklyRent:
                    (weeklyRent *
                        endDate.diff(
                            tempEndDate.clone().subtract(1, 'days'),
                            'days'
                        )) /
                    7,
            })
        }

        return ledgerDetails
    },
}
