const mongoose = require('../database/index');

const PlaylistSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    owner:{
        type: ObjectId,
        required: true
    },
    songs:{
        type: Array,
        required: false
    }
})

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;