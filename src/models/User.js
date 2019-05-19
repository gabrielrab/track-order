const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

UserSchema.pre('save', async function hasPassword(next){

    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods = {
    compareHash(hash){
        return bcrypt.compare(hash, this.password);
    },

    genereteToken() {
        return jwt.sign({ id: this.id }, "secret", {
            expiresIn: 86400
        });
    }
};

mongoose.model('User', UserSchema);
