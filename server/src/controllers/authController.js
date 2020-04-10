const express = require('express');
const jwt = require('jsonwebtoken');
const secret = 'shhh!';
const User = require('../models/user');

const authController = express.Router();

// authController.post('/teste', async (req, res)=>{
//     console.log(req.body)
//     try{
//         const user = await User.create(req.body);
//         console.log("hi", user)
//         res.send({ user });

//     }catch(err){
//         return res.send({error: err.message})
//     }
// });

//login com basic authorization
authController.get('/login', async (req, res)=>{
    if(!req.headers.authorization){
        res.send("Nenhuma credencial enviada!");
    }else{
        console.log(req.headers.authorization);
        //pega o token do basic authorization que veio no header da requisição
        const [hashType, hash] = req.headers.authorization.split(' ');
        console.log(hash);
        //converte o token do header para termos acesso aos dados do usuário(credential[0] = email e credential[1] = password)
        const credentials = Buffer.from(hash, 'base64').toString().split(':');
        
        const user = await User.findOne({ email : credentials[0], password: credentials[1] });
      
        if(user){

            const userid = user._id;
            const token = jwt.sign({userid}, secret);
            res.send({auth: true, token: token});
        }else{
            res.send({auth: false, message:'Login inválido!'})
        }
 
    }
  
})

module.exports = authController;