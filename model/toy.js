const mongoose = require('mongoose');
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
    owner_id:{
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