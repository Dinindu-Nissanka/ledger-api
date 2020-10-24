const GeneralError = require('./GeneralError')

/**
 * Unauthorized error
 */
class UnauthorizedError extends GeneralError {
    getCode() {
        return 401
    }
}

module.exports = UnauthorizedError
