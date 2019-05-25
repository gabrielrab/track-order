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
    tracks: [
        {
            status: {
                type: String,
                required: true,
                lowercase: true
            },
            observation: {
                type: String,
                required: true,
            },
            trackedAt: {
                type: Date,
                required: true,
            },
            unit: {
                type: String,
                required: true,
                uppercase: true
            },
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Order', OrderSchema);