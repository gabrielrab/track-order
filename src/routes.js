const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');

routes.get('/', (req, res)=>{
    res.send("Tamo na área maluco!");     
});

//Order
routes.get('/order', OrderController.index);


module.exports = routes;