const express = require('express');
const bodyParser = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/index')(app);

app.listen(8080);