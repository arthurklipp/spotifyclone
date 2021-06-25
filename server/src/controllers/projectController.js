const express = require('express');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const multerConfig = require('../config/multer');
const router = express.Router();
const User = require('../models/User');

router.use(authMiddleware);

router.get('/',(req,res) =>{
    res.send({ok: true, user: req.userId})
});

router.post('/post', multer(multerConfig).single('file'), async (req,res) =>{
        const id = req.userId;
        User.findOneAndUpdate(id, {$set:{perfil:"http://localhost:8080/uploads/"+req.file.filename}},function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        });
        
    res.send({ok: true, perfil: "http://localhost:8080/uploads/"+req.file.filename})
});

module.exports = app => app.use('/projects', router);