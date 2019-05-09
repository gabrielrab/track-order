const express = require('express');
const mongoose = require('mongoose');

const Order = mongoose.model('Order');

module.exports = {
    async index (req, res){
        const order = await Order.find();
        return res.send({order});
    },


}