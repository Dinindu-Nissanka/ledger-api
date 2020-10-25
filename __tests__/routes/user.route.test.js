const request = require('supertest')
const server = require('../../src/server')

describe('User login POST Endpoint', () => {
    /**
     * Should return an authentication error when username or password is incorrect
     */
    it('should return authentication error', async () => {
        const res = await request(server).post('/v1/user/login').send({
            username: 'username',
            password: 'password',
        })
        expect(res.statusCode).toEqual(401)
        expect(res.body.message).toEqual('Login failed')
    }),
        /**
         * Should return a validation error when the given parameters are incorrect
         */
        it('should return validation error', async () => {
            const res = await request(server).post('/v1/user/login').send({
                username: 123,
                password: 'password',
            })
            expect(res.statusCode).toEqual(400)
            expect(res.body.message).toEqual(
                'Missing or invalid required parameters'
            )
        })
    /**
     * Should returns a token for a successful login attempt
     */
    it('should return login details', async () => {
        const res = await request(server).post('/v1/user/login').send({
            username: 'admin',
            password: 'Admin@123',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
})
