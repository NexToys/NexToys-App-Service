const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 8
    },
    bio: {
        type: String
    },
    pp_url: {
        type: String,
        required: false
    },
    rating:{
        type: Number,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('user',userSchema);