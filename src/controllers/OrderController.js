const express = require('express');
const mongoose = require('mongoose');

const Order = mongoose.model('Order');

module.exports = {
    async index(req, res){
        const order = await Order.find();
        return res.send({order});
    },

    async show(req, res){
        const code = req.params.orderCode;
        
        const order = await Order.findOne({'code': code}, (err, order)=>{
            if(err){
                return res.status(400).send({error: 'Code not found'})
            } else{
                res.send({order});
            }
        });
    }, 

    async create(req, res){
        try {
            const order = await Order.create(req.body);

            return res.json(order);
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Create order error'});
        } 
    },

    async update(req, res){
        try {
            const order = await Order.findOneAndUpdate({'code': req.params.orderCode}, req.body, { new: true }, (err, order)=>{
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