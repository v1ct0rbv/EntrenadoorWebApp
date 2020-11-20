const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

// @route GET api/auth
// @desc  Test Route
// @acess Public
router.get('/',auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route POST api/auth
// @desc  Autentificar user y obtener token
// @acess Public
router.post('/',[
    check('email','Email es requerido').not().isEmpty(),
    check('password','Su contraseña es requerida').exists()
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const { email, password } = req.body
    
    try {

        //Ver si el usuario existe
        let user = await User.findOne({ email })
        
        if(!user){
            return res.status(400).json({errors: [{ msg: 'Credenciales invalidas'}] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Credenciales invalidas'}] })
        }
       
        //Return JsonWebToken
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
            if(err) throw err;
            res.json({ token })
            }
        )

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


})


module.exports = router