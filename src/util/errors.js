class GeneralError extends Error {
    constructor(message, data = null) {
        super()
        this.message = message
        this.data = data
    }

    getCode() {
        if (this instanceof BadRequestError) {
            return 400
        }
        return 500
    }
}

class BadRequestError extends GeneralError {}

module.exports = {
    GeneralError,
    BadRequestError,
}
