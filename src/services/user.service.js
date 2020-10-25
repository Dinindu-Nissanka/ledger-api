const jwt = require('jsonwebtoken')

const UnauthorizedError = require('../util/errors/UnauthorizedError')
const { tokenSecret } = require('../util/constants')

const users = [
    {
        username: 'admin',
        password: 'Admin@123',
        role: 'admin',
    },
    {
        username: 'member',
        password: 'Member@123',
        role: 'member',
    },
]

module.exports = {
    login: (username, password) => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        )

        if (!user) {
            throw new UnauthorizedError(
                'Login failed',
                'Invalid username or password'
            )
        }

        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            tokenSecret
        )
        return accessToken
    },
}
