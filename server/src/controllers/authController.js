const express = require('express');
const User = require('../models/user');

const authController = express.Router();

authController.post('/teste', async (req, res)=>{
    console.log(req.body)
    try{
        const user = await User.create(req.body);
        console.log("hi", user)
        res.send({ user });

    }catch(err){
        return res.send({error: err.message})
    }
});

module.exports = authController;