const mongoose = require('../database');

const PlaylistSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;