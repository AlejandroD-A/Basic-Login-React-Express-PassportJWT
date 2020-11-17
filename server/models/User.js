const mongoose = require('mongoose')
const bcrypt = require ('bcryptjs')

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
})

UserSchema.statics.hashPassword = async (password) =>{
    let salt= await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

UserSchema.statics.isValidPassword = async ( password, userPassword) => {
    const status = await bcrypt.compare(password, userPassword)
    return status
}
module.exports = mongoose.model('User',UserSchema)