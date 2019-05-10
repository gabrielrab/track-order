const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: String,
    remetente:{
        rem_nome: String,
        rem_cep: Number
    },
    sendIn: Date,
    arrivedAt: Date,
});

mongoose.model('Order', OrderSchema);