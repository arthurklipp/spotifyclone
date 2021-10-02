const express = require('express');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const multerConfig = require('../config/multer');
const multerConfig2 = require('../config/multer2');
const router = express.Router();

const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Music = require('../models/Music');
const cors = require('cors');
router.use(cors());


const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

router.use(authMiddleware);
router.use('/music', express.static(path.join(__dirname, '../../public/musics')));
router.use('/music', express.static(path.join(__dirname, '../../public/musics/brasil')));
router.use('/music', express.static(path.join(__dirname, '../../public/musics/rap')));
router.use('/music', express.static(path.join(__dirname, '../../public/musics/rubel')));
router.use('/music', express.static(path.join(__dirname, '../../public/musics/yung buda')));
router.use('/imgs', express.static(path.join(__dirname, '../../public/imgs/perfil')));
router.use('/imgs', express.static(path.join(__dirname, '../../public/imgs/playlist')));
router.use('/imgs', express.static(path.join(__dirname, '../../public/imgs/album')));

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId })
});

router.post('/post', multer(multerConfig).single('file'), async (req, res) => {
    const perfil = await User.findById(req.userId);

    if (perfil.perfil != "pngegg.png") {
        promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'public', 'imgs', 'perfil', perfil.perfil)
        );
    }

    User.findByIdAndUpdate(req.userId, { $set: { perfil: req.file.filename } }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });

    res.send({ ok: true, perfil: req.file.filename })
});

router.post('/playlistImg/:playlistId', multer(multerConfig2).single('file'), async (req, res) => {

    const playlist = await Playlist.findById(req.params.playlistId);

    if (req.userId != playlist.user) {
        return res.status(400).send({ error: 'error upload image playlist(No authorized)' });
    }

    if (playlist.img != "album.png") {
        promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'public', 'imgs', 'playlist', playlist.img)
        );
    }

    Playlist.findByIdAndUpdate(playlist._id, { $set: { img: req.file.filename } }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });

    res.send({ ok: true, img: req.file.filename })
});

router.post('/playlist', async (req, res) => {

    if (req.body.title == "") {
        return res.status(400).send({ error: 'title required' });
    }

    try {
        const { title, description, musics } = req.body;

        const playlist = await Playlist.create({ title, description, user: req.userId });

        if (musics != null) {
            await Promise.all(musics.map(async music => {
                const playlistMusic = new Music({ assignedTo: music.assignedTo, playlist: playlist._id, title: music.title });

                await playlistMusic.save();

                playlist.musics.push(playlistMusic);
            }));
        }

        await playlist.save();

        return res.send({ playlist });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'creating new playlist' });
    }
});

router.get('/playlist', async (req, res) => {
    try {
        const playlist = await Playlist.find().populate(['user', 'musics']);

        return res.send({ playlist });
    } catch (err) {
        return res.status(400).send({ error: 'get playlist' });
    }
});

router.get('/search/:word', async (req, res) => {
    try {
        const music = await Music.find({ title: { $regex: '^' + req.params.word, $options: 'i' } }).limit(10).populate(['playlist', 'assignedTo']);
        const artists = await User.find({ name: { $regex: '^' + req.params.word, $options: 'i' } }).limit(5);
        return res.send({ music, artists });
    } catch (error) {
        return res.status(400).send({ error: 'no music find' });
    }
});

router.get('/listplaylist/:userId', async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.params.userId });
        const user = await User.findOne({ _id: req.params.userId });

        return res.send({ playlists, user });
    } catch (err) {
        return res.status(400).send({ error: 'error loading user playlists' });
    }
});

router.get('/musics/:music', async (req, res) => {
    try {
        const musics = await Music.find({ title: req.params.music }).populate(['assignedTo', 'playlist']);
        const artists = await User.find({ name: req.params.music });

        return res.send({ musics, artists });
    } catch (err) {
        return res.status(400).send({ error: 'error loading musics' });
    }
});

router.post('/musics/show', async (req, res) => {

    const music = await Music.find({ _id: { $in: req.body.music } }).populate(['assignedTo', 'playlist']);
    const rock = await User.find({ genero: 'rock' });
    const rap = await User.find({ genero: 'rap' });
    const brasil = await User.find({ genero: 'brasil' });


    res.send({ music, rock, rap, brasil });
});

router.get('/playlists/:playlistId', async (req, res) => {
    try {
        const playlist = await Playlist.findOne({ _id: req.params.playlistId }).populate(['user']);
        const musicas = await Music.find({ _id: { $in: playlist.musics } }).populate(['playlist', 'assignedTo']);

        return res.send({ playlist, musicas });
    } catch (err) {
        return res.status(400).send({ error: 'error loading playlists' });
    }
});

router.get('/searchuser/:name', async (req, res) => {
    try {
        const results = await User.find({ name: { $regex: '^' + req.params.name, $options: 'i' } }, { email: 0, following: 0, followers: 0, createdAt: 0 });
        return res.send({ results });
    } catch (error) {
        return res.status(400).send({error: 'search user error'});
    }
});

router.post('/follow', async (req, res) => {
    const resp = await User.find({ _id: { $in: req.body.users } }, { email: 0, following: 0, followers: 0, createdAt: 0 });
    return res.send({ resp });
});

router.put('/follow/:userID', async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);

        const found = user.followers.find(e => e == req.userId);

        if (found != undefined) {
            return res.send({ error: 'already following' });
        }

        if (user) {
            const resp = await User.updateOne({ _id: req.userId }, { $push: { following: req.params.userID } });

            await User.updateOne({ _id: req.params.userID }, { $push: { followers: req.userId } });

            return res.send({ resp });
        }

    } catch (error) {
        return res.status(400).send({ error: 'error following' });
    }
});

router.delete('/follow/:userID', async (req, res) => {
    try {
        await User.updateOne({ _id: req.userId }, { $pull: { following: req.params.userID } });

        await User.updateOne({ _id: req.params.userID }, { $pull: { followers: req.userId } });

        return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'unfollow failed' });
    }
});

router.put('/playlists/:playlistId', async (req, res) => {

    const playlist = await Playlist.find({ _id: { $in: req.params.playlistId } });

    if (req.userId != playlist[0].user) {
        return res.status(400).send({ error: 'error update playlist(No authorized)' });
    }

    try {
        const { title, description, musics } = req.body;

        const playlist = await Playlist.findByIdAndUpdate(req.params.playlistId, {
            title,
            description
        }, { new: true });

        playlist.musics = [];
        await Music.remove({ playlist: playlist._id });

        await Promise.all(musics.map(async music => {
            const playlistMusic = new Music({ assignedTo: music.assignedTo, playlist: playlist._id });

            await playlistMusic.save();

            playlist.musics.push(playlistMusic);
        }));

        await playlist.save();

        return res.send({ playlist });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'error updanting playlist' });
    }
});

router.delete('/:playlistId', async (req, res) => {

    const playlist = await Playlist.findById(req.params.playlistId);

    if (req.userId != playlist.user) {
        return res.status(400).send({ error: 'error delete playlist(No authorized)' });
    }

    try {
        if (playlist.img != "album.png") {
            promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'public', 'imgs', 'playlist', playlist.img)
            );
        }
        await Playlist.findByIdAndRemove(req.params.playlistId);
        await Music.remove({ playlist: req.params.playlistId });

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'error delete playlist' });
    }
});

module.exports = app => app.use('/api', router);