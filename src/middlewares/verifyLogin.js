const express = require('express');


module.exports = async (req, res, next)=> {
    if(req.token && req.token.user){ 
        res.redirect("/logado"); 
    } else{
        return res.redirect('/login');
    }
}