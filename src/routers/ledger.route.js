const express = require('express')
const ledgerContoller = require('../controllers/ledger.controller')
const ledgerValidation = require('../util/validation/ledger.validation')

const router = express.Router()

router.route('/').get(ledgerValidation.getLedger(), ledgerContoller.getLedger)

module.exports = router
