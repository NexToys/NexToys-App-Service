const mongoose = require('mongoose');
const joi = require('@hapi/joi');
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
/* 
userSchema.statics.signUpValidation = function(object){
    const schema = joi.object({
        name: joi.string().min(4).max(30).required(),
        username: joi.string().min(4).max(15).required(),
        password: joi.string().min(8).required(),
        email: joi.string().email().required().lowercase(),
        imageurl: joi.string().default('default için resim urlsi girilecek'),
        bio : joi.string().max(200),
        rating: joi.number().default(0.0),
        createdAt: joi.date().default(Date.now)
    });
    return schema.validate(object);
} */

module.exports = mongoose.model('user',userSchema);