const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');
const ClientController = require('./controllers/ClientController');
const UserController = require('./controllers/UserController');
const PagesController = require('./controllers/PagesController');

//Middlewares
const authMiddleware = require('./middlewares/auth');
const verifyLogin = require('./middlewares/verifyLogin');

//Páginas
routes.get('/', (req, res)=>{ res.render("index"); });
routes.get('/login', verifyLogin, (req, res)=>{ return res.render("login"); });
routes.get('/dashboard', authMiddleware, (req, res)=>{ res.render("dashboard");}); 
routes.get('/logado', (req, res)=>{ return res.render("logado"); });
routes.get('/logout', (req, res)=>{ req.token.reset (); res.redirect ( '/' );}) 
routes.get('/createOrder', PagesController.createOrder);
routes.get('/createClient', PagesController.createClient);

//routes.get('/success', (req, res)=>{ return res.render("createSuccess"); });

//User
routes.post('/register', UserController.create);
routes.post('/authenticate', UserController.authenticate);
routes.get('/teste', UserController.selectId);

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