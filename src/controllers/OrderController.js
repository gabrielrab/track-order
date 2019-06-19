const express = require('express');
const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Client = mongoose.model('Client');

//Services
const emailService = require('../services/email');

module.exports = {
    async index(req, res){
        const order = await Order.find().populate('remetente').populate('destinatario');
        return res.send({order});
    },

    async show(req, res){
        const code = req.query.orderCode;
        
        const order = await Order.findOne({'code': code}, (err, order)=>{
            if(err){
                return res.status(400).send({error: 'Code not found'})
            } else{
                return res.render('showOrder', {order});
            }
        }).populate('remetente').populate('destinatario');
    }, 

    async create(req, res){
        const { remetente, destinatario, status, arrivedAt } = req.body
        
        const formatedData = new Date(arrivedAt);

        try {
            const order = await Order.create({remetente: remetente, destinatario: destinatario, status: status, arrivedAt: formatedData});

            const dest = await Client.findById(destinatario);
            
            emailService.send(dest.email, 'Rastreamento criado com sucesso', 'Olá seu reastreamento foi criado com sucesso. Este é o código de rastreio: '+order.code);

            return res.render('createSuccess', {message: 'Rastreamento criado com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Create order error'});
        } 
    },

    async update(req, res){
        try {
            const order = await Order.findOneAndUpdate({'code': req.query.orderCode}, req.body, { new: true }, (err, order)=>{
                if(err){
                    console.log(error);
                    return res.status(400).send({error: 'Update order error'}); 
                } else{
                    //Adicionar aqui envio de email com atualização
                    return res.json(order);
                }
            });
            
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Update order error'});
        }
        
    },

    //Arrumar status do pedido, versão atual so atualiza o da tracks
    async tracks (req, res){
        const { status, observation, unit } = req.body;
        
        try {
            const order = await Order.findOneAndUpdate({'code': req.body.code}, {$push: {tracks: {status, observation, unit}}});
            //aqui

            const dest = await Client.findById(order.destinatario);
            //adicionar base_url_api
            emailService.send(dest.email, 'Rastreamento do pedido atualizado: '+status, 'O rastreamento da sua encomenda foi atualizado. Confira as atualizações <a href="'+process.env.BASE_URL_API+'/order/?orderCode='+req.body.code+'">Aqui</a>');

            console.log(dest.email, 'Rastreamento do pedido atualizado: '+status, 'O rastreamento da sua encomenda foi atualizado. Confira as atualizações <a href="'+process.env.BASE_URL_API+'/order/?orderCode='+req.body.code+'">Aqui</a>');

            return res.render('createSuccess', {message: 'Atualização realizada com sucesso !'});    
        } catch (error) {
            console.log(error);
        }
    },

    async destroy(req, res){
        try {
            const order = await Order.findOneAndDelete({'code': req.query.orderCode}, (err, order)=>{
                if (err) {
                    console.log(err)
                    res.status(400).send({error: 'Delete order error'});
                } else {
                    res.render('createSuccess', {message: 'Rastreamento de encomenda deletado com sucesso!'});
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Delete order error'})
        }
    }
}