const GeneralError = require('./GeneralError')

/**
 * Bad request error
 */
class BadRequestError extends GeneralError {
    getCode() {
        return 400
    }
}

module.exports = BadRequestError
