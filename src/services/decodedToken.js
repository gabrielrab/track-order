const express = require('express');
const jwtDecode = require('jwt-decode');

module.exports.decodedToken = function(req, res){
    const cookieToken = req.token.user;

    try {
        var decoded = jwtDecode(cookieToken);
    
        const id = decoded.id;
    
        return id; 
    } catch (error) {
        return res.render('login', {error: 'Token não encontrado'});
    }

}