const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//App
const app = express();

const server = require('http').Server(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Banco de Dados
mongoose.connect('mongodb://gabrielrab:67920000Ab@ds331145.mlab.com:31145/api-tasks', { useNewUrlParser: true, useCreateIndex: true, });

//Models
requireDir('./models');

//Rotas
app.use('/', require('./routes'));


module.exports = {app: app, server: server};