const express = require('express');
const mongoose = require('mongoose');

const Order = mongoose.model('Order');

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

            return res.json(order);
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
                    return res.json(order);
                }
            });
            
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Update order error'});
        }
        
    },

    async tracks (req, res){
        const { status, observation, unit } = req.body;
        
        try {
            const order = await Order.findOneAndUpdate({'code': req.body.code}, {$push: {tracks: {status, observation, unit}}});
            //aqui
            return res.render('createSuccess', {message: 'Atualização realizada com sucesso !', order});    
        } catch (error) {
            console.log(error);
        }
    },

    async destroy(req, res){
        try {
            const order = await Order.findOneAndDelete({'code': req.params.orderCode}, (err, order)=>{
                if (err) {
                    console.log(err)
                    res.status(400).send({error: 'Delete order error'});
                } else {
                    res.send('Delete order success');
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Delete order error'})
        }
    }
}