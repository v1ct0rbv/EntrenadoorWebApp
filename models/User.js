const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    role:{
        type:String,
        default:'normal'
    },
    resetPasswordLink:{
        data:String,
        default:''
    }

})

module.exports = User = mongoose.model('user',UserSchema)