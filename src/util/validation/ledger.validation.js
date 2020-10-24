const { query } = require('express-validator')

module.exports = {
    getLedger: () => {
        return [
            query('start_date').not().isEmpty().isISO8601(),
            query('end_date').not().isEmpty().isISO8601(),
            query('frequency').not().isEmpty().isString(),
            query('weekly_rent').not().isEmpty().isNumeric(),
        ]
    },
}
