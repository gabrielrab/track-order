const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    remetente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true
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