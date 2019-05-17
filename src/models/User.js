const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        select: false,
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

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;