const userService = require('../../src/services/user.service')
const UnauthorizedError = require('../../src/util/errors/UnauthorizedError')

describe('User Login Service', () => {
    /**
     * Should returns a token for a successful login
     */
    it('should returns a token', () => {
        const username = 'admin'
        const password = 'Admin@123'

        const result = userService.login(username, password)

        expect(result).toEqual(expect.anything())
    }),
        /**
         * Should throw unauthorized error when login attempt failed
         */
        it('should throw Unauthorized error', () => {
            const username = 'user'
            const password = 'password'

            expect(() => userService.login(username, password)).toThrow(
                UnauthorizedError
            )
        })
})
