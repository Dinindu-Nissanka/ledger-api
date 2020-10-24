const config = require('config')

const logger = require('./util/logger')
const app = require('./server.js')

app.listen(config.get('port'), () => {
    logger.info('Started application')
})
