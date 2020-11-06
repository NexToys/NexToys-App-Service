const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: image,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('toy',toySchema);