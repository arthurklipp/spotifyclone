const mongoose = require('../database/index');

const SongSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    user_id:{
        type: ObjectId,
        required: true
    },
    path:{ //caminho do arquivo da musica no servidor
        type: String,
        required:true
    }
})

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;