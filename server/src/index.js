const express = require('express');
const bodyParser = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../public/imgs/perfil')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

require('./controllers/index')(app);

app.listen(8080);