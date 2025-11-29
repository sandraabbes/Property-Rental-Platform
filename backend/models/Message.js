const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);
