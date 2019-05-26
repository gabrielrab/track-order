const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = mongoose.Schema({
    code: {
        type: Number,
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
                lowercase: true
            },
            trackedAt: {
                type: Date,
                required: true,
            },
            unit: {
                type: String,
                required: true,
                lowercase: true
            },
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

OrderSchema.plugin(AutoIncrement, {id: 'code_seq', inc_field: 'code'});

mongoose.model('Order', OrderSchema);