const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');

routes.get('/', (req, res)=>{
    res.send("Tamo na área maluco!");     
});

//Order
routes.get('/order', OrderController.index);
routes.get('/order/:orderCode', OrderController.show);
routes.post('/order', OrderController.create);


module.exports = routes;