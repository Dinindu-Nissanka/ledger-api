const GeneralError = require('./GeneralError')

/**
 * Forbidden error
 */
class ForbiddenError extends GeneralError {
    getCode() {
        return 403
    }
}

module.exports = ForbiddenError
