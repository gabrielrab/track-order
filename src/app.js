const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');


//App
const app = express();

const server = require('http').Server(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cors
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Engine config
app.set('views', __dirname +'/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Banco de Dados
mongoose.connect('mongodb://gabrielrab:67920000Ab@ds331145.mlab.com:31145/api-tasks', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

//Models
requireDir('./models');

//Rotas
app.use('/', require('./routes'));


module.exports = {app: app, server: server};