const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spotify', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;