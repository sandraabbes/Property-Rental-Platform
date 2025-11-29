const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Property = require('../models/Property');
const multer = require('multer');
const path = require('path');

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// @route   GET api/properties
// @desc    Get all properties with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { city, minPrice, maxPrice, rooms } = req.query;
        let query = {};

        if (city) query.city = { $regex: city, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }
        if (rooms) query.rooms = { $gte: rooms };

        const properties = await Property.find(query).sort({ date: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/properties
// @desc    Create a property
// @access  Private (Admin only)
router.post('/', [auth, upload.array('images', 5)], async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }

    try {
        const { title, description, price, city, rooms } = req.body;
        const imagePaths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

        const newProperty = new Property({
            title,
            description,
            price,
            city,
            rooms,
            images: imagePaths
        });

        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/properties/:id
// @desc    Update a property
// @access  Private (Admin only)
router.put('/:id', [auth, upload.array('images', 5)], async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }

    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        const { title, description, price, city, rooms } = req.body;
        let imagePaths = property.images; // Keep existing images by default

        if (req.files && req.files.length > 0) {
            // If new files are uploaded, replace existing (or append, depending on logic. Here replacing for simplicity or appending?)
            // Let's append for now or just replace? The user didn't specify.
            // Usually edit replaces or adds. Let's assume replace if new ones provided for simplicity in this MVP, 
            // or better, just append new ones. 
            // Actually, standard file input behavior in simple forms often replaces.
            // Let's go with: if files uploaded, use them. If not, keep old.
            // But wait, if I want to keep old AND add new, I need more complex UI.
            // Let's just replace for now if files are provided, or maybe append.
            // Let's append.
            const newPaths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
            imagePaths = [...imagePaths, ...newPaths];
        }

        // Also allow updating text fields
        const updateFields = { title, description, price, city, rooms, images: imagePaths };

        property = await Property.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/properties/:id
// @desc    Delete a property
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }

    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        await Property.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
