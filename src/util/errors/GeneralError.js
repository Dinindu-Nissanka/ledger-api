/**
 * General error class for the application
 */
class GeneralError extends Error {
    constructor(message, data = null) {
        super()
        this.message = message
        this.data = data
    }

    getCode() {
        return 500
    }
}

module.exports = GeneralError
