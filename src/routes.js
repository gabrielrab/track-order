const express = require('express');
const routes = express.Router();

 //retirar depois
const mongoose = require('mongoose');
const User = mongoose.model('User');

//Import Controllers
const OrderController = require('./controllers/OrderController');
const ClientController = require('./controllers/ClientController');
const UserController = require('./controllers/UserController');

//Middlewares
const authMiddleware = require('./middlewares/auth');

//Rota inicial
routes.get('/', (req, res)=>{ res.render("index"); });

//User
routes.post('/register', async(req, res)=>{
    const { email, name } = req.body;

    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exist'});
        }

        const user = await User.create(req.body);

        return res.json({user});
    } catch (error) {
        return res.status(400).json({ error: "User registration failed" });
    }
});
routes.post('/authenticate', async(req, res) =>{
    const { email, password } = req.body;

    console.log(email);

    const user = await User.findOne({'email': email});

    try {
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }

        if(!(await user.compareHash(password))){
            return res.status(400).send({error: 'Invalid password'});
        }

        return res.json({user, token: user.genereteToken()});

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "User authenticate failed" });
    }
});
//Remover depois
routes.use(authMiddleware);

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