const mongoose = require('../database/index');

const UserSchema = new mongoose.Schema({
    img:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

 const User = mongoose.model('User', UserSchema);

 module.exports = User;