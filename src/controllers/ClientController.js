const express = require('express');
const mongoose = require('mongoose');

const Client = mongoose.model('Client');

module.exports = {
    async index(req, res){
        const client = await Client.find().populate('clientFor');
        return res.send({client});
    },

    async show(req, res){
        try {
            const client = await Client.findById(req.params.clientId).populate('clientFor');

            return res.send({client}); 

        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Client not find'});
        }
        
    },

    async create(req, res){
        try {
            const client = await Client.create(req.body);

            //Redirecionar para view createSuccess
            return res.json(client);

        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Client not created'});
        }
    },

    async update(req, res){
        try {
            const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, {new: true});

            return res.send({client}); 

        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'Client not find'});
        }
    },
    async destroy (req, res){
        const client = await User.findByIdAndRemove(req.params.clientId);

        return res.send('Deleted successfully');
    }
}