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
routes.get('/logado', (req, res)=>{ return res.render("logado"); });
routes.get('/logout', (req, res)=>{ req.token.reset (); res.redirect ( '/' );}) 
routes.get('/createOrder', PagesController.createOrder);
routes.get('/createClient', PagesController.createClient);
routes.get('/dashboard', authMiddleware, PagesController.goDashboard);
routes.get('/update', authMiddleware, PagesController.updateTracks);
routes.get('/account', authMiddleware, PagesController.account);
routes.get('/userUpdate', authMiddleware, PagesController.userUpdate);
routes.get('/addressUpdate', authMiddleware, PagesController.addressUpdate);
///Teste de envio de email


//Modificar
const emailService = require('./services/email');
routes.get('/email', (req, res)=>{

    try {
        emailService.send('contato.ideialisa@gmail.com', 'Bem-vindo ao TrackOrder', '<b>Olá bem vindo ao track-order</b> Este é um teste de envio de em-mail pelo SendGrid');
        res.send('Ok');    
    } catch (error) {
        res.status(400).send('bad');
        console.log(error);
    }
    
});

//User
routes.post('/register', UserController.create);
routes.post('/authenticate', UserController.authenticate);
routes.get('/teste', UserController.selectId);
routes.post('/updateUser', UserController.update);

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
routes.post('/push-tracks', OrderController.tracks);
routes.get('/delete-order', OrderController.destroy);
//teste
routes.get('/print-label', OrderController.printLabel)

module.exports = routes;