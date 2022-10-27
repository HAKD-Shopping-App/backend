const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

//get requests here


//post requests here
router.post('/userSignup', actions.userSignup)
router.post('/userLogin', actions.userLogin)

module.exports = router