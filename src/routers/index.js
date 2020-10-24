module.exports = (app) => {
    app.use('/v1/ledger', require('./ledger.route'))
}
