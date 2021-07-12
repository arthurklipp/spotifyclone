const mongoose = require('../database');

const MusicSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    playlist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        require: true,
        
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;