const express = require('express');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const multerConfig = require('../config/multer');
const router = express.Router();

const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Music = require('../models/Music');


const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

router.use(authMiddleware);

router.get('/',(req,res) =>{
    res.send({ok: true, user: req.userId})
});

router.post('/post', multer(multerConfig).single('file'), async (req,res) =>{
        const id = req.userId;
        const perfil = await User.findById(id);

        if(perfil.perfil!="http://localhost:8080/uploads/pngegg.png"){
            promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'public', 'imgs', 'perfil', perfil.perfil)
              );
        }
        
        User.findByIdAndUpdate(id, {$set:{perfil:"http://localhost:8080/uploads/"+req.file.filename}},function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        });
        
    res.send({ok: true, perfil: "http://localhost:8080/uploads/"+req.file.filename})
});

router.post('/playlist', async(req, res) => {
    try{
        const { title, description, musics } = req.body;

        const playlist = await Playlist.create({title, description, user: req.userId});

        await Promise.all(musics.map(async music =>{
            const playlistMusic = new Music({assignedTo: music.assignedTo, playlist: playlist._id});

            await playlistMusic.save();

            playlist.musics.push(playlistMusic);
        }));

        await playlist.save();

        return res.send({ playlist });
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'creating new playlist'});
    }
});

router.get('/playlist', async(req, res) => {
    try{
        const playlist = await Playlist.find().populate(['user', 'musics']);

        return res.send({ playlist });
    }catch(err){
        return res.status(400).send({error: 'creating new playlist'});
    }
});

router.get('/:userId', async(req, res) => {
    try{
        const playlists = await Playlist.find({user: req.params.userId}).populate(['user', 'musics']);

        return res.send({ playlists });
    }catch(err){
        return res.status(400).send({error: 'error loading playlists'});
    }
});

router.get('/playlists/:playlistId', async(req, res) => {
    try{
        const playlist = await Playlist.find({_id: req.params.playlistId});
        const musicas = await Music.find({_id: {$in:req.body.music}});

        return res.send({ playlist, musicas });
    }catch(err){
        return res.status(400).send({error: 'error loading playlists'});
    }
});

router.put('/playlists/:playlistId', async(req, res) => {
    try{
        const { title, description, musics } = req.body;

        const playlist = await Playlist.findByIdAndUpdate(req.params.playlistId, {
            title,
            description
        }, { new: true });

        playlist.musics = [];
        await Music.remove({ playlist: playlist._id });

        await Promise.all(musics.map(async music =>{
            const playlistMusic = new Music({assignedTo: music.assignedTo, playlist: playlist._id});

            await playlistMusic.save();

            playlist.musics.push(playlistMusic);
        }));

        await playlist.save();

        return res.send({ playlist });
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'error updanting playlist'});
    }
});

router.delete('/:playlistId', async(req, res) => {
    try{
        await Playlist.findByIdAndRemove(req.params.playlistId);

        return res.send();
    }catch(err){
        return res.status(400).send({error: 'error delete playlist'});
    }
});

module.exports = app => app.use('/projects', router);