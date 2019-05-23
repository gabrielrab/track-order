const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    remetente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }, 
    destinatario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true
    },
    sendIn: Date,
    arrivedAt: Date,
    status: {type: String, require: true},
    createdAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Order', OrderSchema);