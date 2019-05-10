const express = require('express');
const bodyParser = require('body-parser');

//App
const app = express();

const server = require('http').Server(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas
app.use('/', require('./routes'));


module.exports = {app: app, server: server};