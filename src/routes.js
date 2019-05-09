const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');

//Páginas
routes.get('/', (req, res)=>{
    res.send("Tamo na área maluco!");     
});

routes.get('/order', OrderController.index);

module.exports = routes;