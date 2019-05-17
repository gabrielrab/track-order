const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    async index(req, res){
        const user = await User.find();
        return res.send({user});
    },

    async show(req, res){
        try {
            const user = await User.findById(req.params.userId);
        return res.send({user});
        } catch (error) {
            console.log(error);
            res.status(400).send({error: 'User not find'});
        }
    }
}