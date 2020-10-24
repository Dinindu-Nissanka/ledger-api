const express = require('express')
const ledgerContoller = require('../controllers/ledger.controller')
const ledgerValidation = require('../util/validation/ledger.validation')
const checkAuthentication = require('../middleware/authenticate')

const router = express.Router()

router
    .route('/')
    .get(
        checkAuthentication,
        ledgerValidation.getLedger(),
        ledgerContoller.getLedger
    )

module.exports = router
