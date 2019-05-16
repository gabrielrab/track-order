const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    clientFor: String,
    name: String,
    cpf: Number,
    address: String,
    cep: Number,
    city: String,
    uf: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Client', ClientSchema);