const { validationResult } = require('express-validator')
const BadRequestError = require('../util/errors/BadRequestError')

const ledgerService = require('../services/ledger.service')

const logger = require('../util/logger')

module.exports = {
    getLedger: async (req, res, next) => {
        try {
            //Check for any validation errors from express-validator
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                logger.error('Validation Error', errors)
                throw new BadRequestError(
                    'Missing or invalid required parameters',
                    errors
                )
            }

            const {
                start_date: startDate,
                end_date: endDate,
                frequency,
                weekly_rent: weeklyRent,
            } = req.query

            const ledger = ledgerService.getLedger({
                startDate,
                endDate,
                frequency,
                weeklyRent,
            })
            logger.debug('Fetched ledger details', ledger)
            return res.json(ledger)
        } catch (error) {
            logger.error(
                'Error occurred while processing ledger details',
                error
            )
            next(error)
        }
    },
}
