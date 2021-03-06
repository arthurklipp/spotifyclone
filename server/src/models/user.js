const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    perfil:{
        type: String,
        require: false,
    },
    genero:[{
        type: String,
        require: false,
    }],
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    following:[{
        type: String
    }],
    followers:[{
        type: String
    }],
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    this.perfil = 'pngegg.png';
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;