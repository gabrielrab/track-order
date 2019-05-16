const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    remetente:{
        rem_nome: String,
        rem_cep: Number
    },
    sendIn: Date,
    arrivedAt: Date,
    status: String,
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Order', OrderSchema);