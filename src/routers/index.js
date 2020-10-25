module.exports = (app) => {
    app.use('/v1/ledger', require('./ledger.route'))
    app.use('/v1/user', require('./user.route'))
}
