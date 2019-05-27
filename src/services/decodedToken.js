const express = require('express');
const jwt = require('jsonwebtoken');

exports.decodedToken = function(req, res){
    const token = req.token.user;
    try {
        const decoded = promisify(jwt.sign)(token, "secret");
        
        const userId = decoded.id;

        return userId;
    } catch (error) {
        return res.render('login', {error: 'Token invalid'});
    }   
}

//Parei na parte de fazer uma função global para ler o id do adm