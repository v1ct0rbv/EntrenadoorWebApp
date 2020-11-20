const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    nombre:{
        type: String,
        required: true,
    },
    fechaDeNacimiento:{
        type: Date,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    sexo:{
        type:String,
        required: true
    },
    contextura:{
        type:String,
        required:true
    },
    estatura:{
        type:String,
    },
    peso:{
        type:Numbre
    },
    programa:{
        diasentrenados:{
            type:Number
        },
        rendimiento:{
            type:Number
        },
        Ponderacion:{
            type:Number
        },
        ejercicios:[String]
    }

})

module.exports = Profile = mongoose.model('profile',ProfileSchema)