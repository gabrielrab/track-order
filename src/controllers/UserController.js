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
    },

    async create(req, res){
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
    },

    async authenticate(req, res){
        const { email, password } = req.body;
        const user = await User.findOne({'email': email});

        try {
            if(!user){
                return res.status(400).json({ error: "User not found" });
            }

            if(!(await user.compareHash(password))){
                return res.status(400).send({error: 'Invalid password'});
            }
            
            //json({user, token: user.genereteToken()}) 
            return res.render('token', {user, token: user.genereteToken()});

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "User authenticate failed" });
        }
    },

}