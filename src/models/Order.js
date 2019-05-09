const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
    }
    // type: String,
    // // destinatario:{
    // //     dest_name: String,
    // //     dest_address: String,
    // //     dest_cep: Number,
    // //     dest_city: String,
    // // },
    // sendIt: Date,
    // arriveAt: Date,
});

mongoose.model('Order', OrderSchema);