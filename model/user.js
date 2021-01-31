const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
        default: ""
    },
    imageurl: {
        type: String,
        default: ""
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