const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    owner: {
        name: String,
        email: String,
        phone: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Property', PropertySchema);
