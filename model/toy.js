const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const toySchema = new Schema({
    isActive:{
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    ownerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* toySchema.statics.signUpValidation = function(object){
    const schema = joi.object({
        isActive: joi.bool().required().default(false),
        name: joi.string().min(4).max(45).required(),
        description: joi.string().max(200),
        type: joi.string().required(),
        imageids: joi.array().string().required(),
        ownerId: joi.ObjectId().ref('User').required(),
        createdAt: joi.date().default(Date.now)
    });
    return schema.validate(object);
} */

module.exports = mongoose.model('toy',toySchema);