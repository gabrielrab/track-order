const express = require('express');


module.exports = async (req, res, next)=> {
    if(req.token && req.token.user){ 
        return res.redirect("/logado"); 
    } else{
        return next();
    }
}