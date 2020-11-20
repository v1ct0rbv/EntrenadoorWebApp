const mongoose = require('mongoose')

const EjercicioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    nombre:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    exigencia:{
        type:String,
    },
    metrica:{
        type:String,
    },
    carga:{
        type:String
    },
    categoria:{
        type:String
    },
    nivel:{
        type:String
    },
    progresion:{
        type:String
    },
    tipoejercio:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }

})

module.exports = User = mongoose.model('user',EjercicioSchema)