const express = require('express');
const routes = express.Router();

//Import Controllers
const OrderController = require('./controllers/OrderController');
const ClientController = require('./controllers/ClientController');
const UserController = require('./controllers/UserController');

//Middlewares
const authMiddleware = require('./middlewares/auth');

//Rota inicial
routes.get('/', (req, res)=>{ res.render("index"); });
routes.get('/login', (req, res)=>{ res.render("login"); });
routes.get('/dashboard', (req, res)=>{ res.render("rastreador"); }); 
routes.get('/logado', (req, res)=>{ res.render("logado"); }); 

//User
routes.post('/register', UserController.create);
routes.post('/authenticate', UserController.authenticate);

//Remover depois => Colocar nas rotas que necessitem de autenticação depois de acertar o login...
//routes.use(authMiddleware);

//Order
routes.get('/order', OrderController.index);
routes.get('/order/:orderCode', OrderController.show);
routes.post('/order/:userId', OrderController.create);
routes.put('/order/:orderCode', OrderController.update);
routes.delete('/order/:orderCode', OrderController.destroy);

//Client
routes.get('/client', ClientController.index);
routes.get('/client/:clientId', ClientController.show);
routes.post('/client', ClientController.create);
routes.put('/client/:clientId', ClientController.update);
routes.delete('/client/:clientId', ClientController.destroy);


module.exports = routes;