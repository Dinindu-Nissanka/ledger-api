const express = require('express')
const bodyParser = require('body-parser')

const morgan = require('morgan')

const logger = require('./util/logger')
const errorHandler = require('./middleware/errorHandler')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger.json')

const router = require('./routers')

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

const loggerStream = {
    write: (text) => {
        logger.info(text)
    },
}

app.use(morgan('combined', { stream: loggerStream }))

router(app)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((err, req, res, next) => {
    errorHandler(err, res)
})

module.exports = app
