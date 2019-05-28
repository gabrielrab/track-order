const express = require('express');
const jwtDecode = require('jwt-decode');

module.exports.decodedToken = function(req, res){
    const cookieToken = req.token.user;

    var decoded = jwtDecode(cookieToken);
    
    const id = decoded.id;

    return id;

}