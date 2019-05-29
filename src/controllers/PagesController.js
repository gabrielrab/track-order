const express =  require('express');
const mongoose = require('mongoose');

//Services
const decoded = require('../services/decodedToken');

//Models
const Client = mongoose.model('Client');

module.exports = {
    async createOrder(req, res){
        const id = decoded.decodedToken(req, res);

        const clients = await Client.findOne({'clientFor': id}, (err, clients)=>{
            if(err){
                return res.status(400).send({error: 'Esse id de usuário não está disponivel. FAvor entrar em contato com o desenvolvedor do sistema.'});
            } else{
                console.log(clients);
                return res.render('createOrder', {id: id, r_client: clients});
            }
        });

    }
}