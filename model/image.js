const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    /* isProfilePic:{
        type: Boolean,
        required: true,
        default: false
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    toyId: {
        type: Schema.Types.ObjectId,
        ref: 'Toy',
        required: false
    }, */
    height: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})
/* 
imageSchema.statics.signUpValidation = function(object){
    const schema = joi.object({
        isProfilePic: joi.bool().required().default(false),
        profileId: joi.ObjectId().ref('User'),
        toyId: joi.ObjectId().ref('Toy'),
        height : joi.string().required(),
        width: joi.string().required(),
        fileSize: joi.string().required(),
        path: joi.string().required()
    });
    return schema.validate(object);
} */

module.exports = mongoose.model('image',imageSchema);