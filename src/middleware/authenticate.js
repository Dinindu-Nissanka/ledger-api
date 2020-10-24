const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../util/errors/UnauthorizedError')
const ForbiddenError = require('../util/errors/ForbiddenError')

const tokenSecret = 'ledgertokensecret'

/**
 * Middleware to check authorization header and validate jwt token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        /**
         * Verify the given token
         * Throw forbidden error if it is not valid
         */
        jwt.verify(token, tokenSecret, (err) => {
            if (err) {
                throw new ForbiddenError('Forbidden', 'Invalid bearer token')
            }
            next()
        })
        next()
    } else {
        /**
         * Throw unauthorized error when the header is missing
         */
        throw new UnauthorizedError(
            'Authorization header required',
            'Missing authorization header'
        )
    }
}

module.exports = checkAuthentication
