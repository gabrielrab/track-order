const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    clientFor: String,
    name: String,
    email:{
        type: String,
        unique: true,
        lowercase: true
    },
    phone:{
        type: String,
        require: true
    },
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