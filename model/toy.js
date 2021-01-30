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

module.exports = mongoose.model('toy',toySchema);