const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    destinatario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true
    },
    sendIn: Date,
    arrivedAt: Date,
    status: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Order', OrderSchema);