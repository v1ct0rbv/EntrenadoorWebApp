const express = require('express')
const router = express.Router()


// @route GET api/ejercicio
// @desc  Test Route
// @acess Private
router.get('/',(req,res) => res.send('Ejercicios Route'))


module.exports = router