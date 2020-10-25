const express = require('express')
const userContoller = require('../controllers/user.controller')
const userValidation = require('../util/validation/user.validation')

const router = express.Router()

router.route('/login').post(userValidation.login(), userContoller.login)

module.exports = router
