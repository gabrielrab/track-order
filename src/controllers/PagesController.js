const express =  require('express');
const mongoose = require('mongoose');

//Services
const decoded = require('../services/decodedToken');

//Models
const Client = mongoose.model('Client');
const Order = mongoose.model('Order');

module.exports = {
    async createOrder(req, res){
        const id = decoded.decodedToken(req, res);

        const clients = await Client.find({'clientFor': id}, (err, clients)=>{
            if(err){
                return res.status(400).send({error: 'Esse id de usuário não está disponivel. Favor entrar em contato com o desenvolvedor do sistema.'});
            } else{
                return res.render('createOrder', {id: id, r_client: clients});
            }
        });

    },

    async createClient(req, res){
        const id = decoded.decodedToken(req, res);

        return res.render('createClient', {id: id});
    },

    async goDashboard(req, res){
        const id = decoded.decodedToken(req, res);

        const orders = await Order.find({'remetente': id}, (err, orders)=>{
            if(err){
                return res.status(400).send({error: 'Problema na decodificação do token. Faça o login novamente'});
            } else{
                return res.render('dashboard', {orders});
                //return res.send({orders});
            }
        }).populate('remetente').populate('destinatario');
    },

    async updateTracks(req, res){
        // Aqui tenho que retornar uma página com todo o conteúdo referente a track que deve ser atualizada.
        const id = req.query.id;

        const order = await Order.findById(id).populate('remetente').populate('destinatario');

        return res.render('updateTracks', {order});
    }
}