const express = require('express');
const routes = express.Router();

routes.get('/', (req, res)=>{
    res.send("Tamo na área maluco!");     
});

module.exports = routes;