const createError = require('http-errors');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new product (POST)
const createProduct = async (req, res, next) => {
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        };
        const result = await mongodb.getDatabase().db().collection('products').insertOne(product);
        res.status(201).json({ productId: result.insertedId });
    } catch (error) {
        next(createError(400, error.message));
    }
};

// Get all products (GET)
const getAllProducts = async (req, res, next) => {
    try {
        const products = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.status(200).json(products);
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Get a single product by ID (GET)
const getSingleProduct = async (req, res, next) => {
    try {
        const productId = new ObjectId(req.params.id);
        const product = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!product) throw createError(404, 'Product not found');

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof ObjectId.InvalidIdError) {
            next(createError(400, 'Invalid product ID format'));
        } else {
            next(createError(500, error.message));
        }
    }
};

// Update a product by ID (PUT)
const updateProduct = async (req, res, next) => {
    try {
        const productId = new ObjectId(req.params.id);
        const updates = req.body;

        const result = await mongodb.getDatabase().db().collection('products').updateOne(
            { _id: productId },
            { $set: updates }
        );

        if (result.matchedCount === 0) throw createError(404, 'Product not found');

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        if (error instanceof ObjectId.InvalidIdError) {
            next(createError(400, 'Invalid product ID format'));
        } else {
            next(createError(400, error.message));
        }
    }
};

// Delete a product by ID (DELETE)
const deleteProduct = async (req, res, next) => {
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (result.deletedCount === 0) throw createError(404, 'Product not found');

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        if (error instanceof ObjectId.InvalidIdError) {
            next(createError(400, 'Invalid product ID format'));
        } else {
            next(createError(500, error.message));
        }
    }
};

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };