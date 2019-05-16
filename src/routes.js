const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');
const ClientController = require('./controllers/ClientController');

routes.get('/', (req, res)=>{
    res.render("index");     
});

//Order
routes.get('/order', OrderController.index);
routes.get('/order/:orderCode', OrderController.show);
routes.post('/order', OrderController.create);
routes.put('/order/:orderCode', OrderController.update);
routes.delete('/order/:orderCode', OrderController.destroy);

//Client
routes.get('/client', ClientController.index);
routes.get('/client/:clientId', ClientController.show);
routes.post('/client', ClientController.create);
routes.put('/client/:clientId', ClientController.update);
routes.delete('/client/:clientId', ClientController.destroy);


module.exports = routes;