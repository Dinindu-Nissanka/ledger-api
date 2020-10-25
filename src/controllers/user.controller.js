const { validationResult } = require('express-validator')
const BadRequestError = require('../util/errors/BadRequestError')

const userService = require('../services/user.service')

const logger = require('../util/logger')

module.exports = {
    login: async (req, res, next) => {
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

            const { username, password } = req.body

            const token = userService.login(username, password)
            logger.debug(
                `User login token for the user ${username} is successful`
            )
            return res.json({ token })
        } catch (error) {
            logger.error(
                'Error occurred while processing ledger details',
                error
            )
            next(error)
        }
    },
}
