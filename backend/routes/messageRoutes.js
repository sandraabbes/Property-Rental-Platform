const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Message = require('../models/Message');

// @route   POST api/messages
// @desc    Send a message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/messages
// @desc    Get all messages
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }

    try {
        const messages = await Message.find().populate('propertyId', 'title');
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    console.log(`Attempting to delete message with ID: ${req.params.id}`);
    if (req.user.role !== 'admin') {
        console.log('User is not admin');
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }

    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            console.log('Message not found');
            return res.status(404).json({ msg: 'Message not found' });
        }

        console.log('Message deleted successfully');
        res.json({ msg: 'Message removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Message not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
