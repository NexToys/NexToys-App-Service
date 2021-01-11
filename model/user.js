const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    surname: {
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
        type: String
    },
    pp_url: {
        type: String,
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

userSchema.statics.signUpValidation = function(object){
    const schema = joi.object({
        name: joi.string().min(4).max(15).required(),
        surname: joi.string().min(4).max(15).required(),
        username: joi.string().min(4).max(15).required(),
        password: joi.string().min(8).required(),
        email: joi.string().email().required().lowercase(),
        bio : joi.string(),
        rating: joi.number().default(0.0),
        createdAt: joi.date().default(Date.now)
    });
    return schema.validate(object);
}

module.exports = mongoose.model('user',userSchema);