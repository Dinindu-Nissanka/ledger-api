const { body } = require('express-validator')

module.exports = {
    login: () => {
        return [
            body('username').not().isEmpty().isString(),
            body('password').not().isEmpty().isString(),
        ]
    },
}
