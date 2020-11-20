const express = require('express')
const router = express.Router()
const {check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const config = require('config')
const sgMail = require('@sendgrid/mail')
const User = require('../../models/User')
const { json } = require('express')


SENDGRID_API_KEY=`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`
EMAIL_FROM='victor.bv.996@outlook.com'
sgMail.setApiKey(SENDGRID_API_KEY)
CLIENT_URL='http://localhost:3000'

// @route Post api/users
// @desc  Register user
// @acess Public
router.post('/',[
    check('email','Email es requerido').not().isEmpty(),
    check('password','Porfavor ingrese una contraseña con un minimo de 6 caracteres').isLength({min: 6})
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const { email, password } = req.body
    
    try {

        //Ver si el usuario existe
        let user = await User.findOne({ email })
        
        if(user){
            return res.status(400).json({errors: [{ msg: 'El usuario ya existe'}] })
        }

        //Crear instancia del usuario
        user = new User({
            email,
            password
        })
        
        //Encriptar contraseña
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        //Guardar usuario
        await user.save()

        //Return JsonWebToken
        const payload = {
            user:{
                id: user.id
            }
        }
        //const token = await jwt.sign(
        //    payload,
        //    config.get('jwtSecret'),
        //    { expiresIn: 3600 }
        //)

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );

        //const msg = {
        //   to: email, // Change to your recipient
        //    from: EMAIL_FROM, // Change to your verified sender
        //    subject: 'Activar cuenta Entrenadoor',
        //    html: `
        //    <h1>Por favor ingrese al siguiente link para activar su cuenta.</h1>
        //    <a href='${CLIENT_URL}/users/activate/${token}'>${token}</a>
        //   `,
        // }

        //  sgMail
        //  .send(msg)
        //  .then(() => {
        //    console.log('Email sent')
        //  })
        //  .catch((error) => {
        //    console.error(error)
        //  })


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


})

        //Guardar usuario
        // await user.save()



module.exports = router