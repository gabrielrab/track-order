const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');
const ClientController = require('./controllers/ClientController');
const UserController = require('./controllers/UserController');

//Middlewares
const authMiddleware = require('./middlewares/auth');
const verifyLogin = require('./middlewares/verifyLogin');

//Parei na parte de criar páginas para erro

//Rota inicial
routes.get('/', (req, res)=>{ res.render("index"); });
routes.get('/login', (req, res)=>{ res.render("login"); });
routes.get('/dashboard', authMiddleware, (req, res)=>{ res.render("rastreador"); }); 
routes.get('/logado', (req, res)=>{ res.render("logado"); });
routes.get('/logout', (req, res)=>{ req.token.reset (); res.redirect ( '/' );}) 

//User
routes.post('/register', UserController.create);
routes.post('/authenticate', UserController.authenticate);

//Client
routes.get('/client', ClientController.index);
routes.get('/client/:clientId', ClientController.show);
routes.post('/client', ClientController.create);
routes.put('/client/:clientId', ClientController.update);
routes.delete('/client/:clientId', ClientController.destroy);

//Order -
routes.get('/allorder', OrderController.index);
routes.get('/order/', OrderController.show);
routes.post('/order', OrderController.create);
routes.put('/order', OrderController.update);
routes.put('/push-tracks', OrderController.tracks);
routes.delete('/order/:orderCode', OrderController.destroy);

module.exports = routes;