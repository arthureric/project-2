const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

const { productValidation } = require('../middlewares/validation');

const { validationResult } = require('express-validator');

// Middleware to check validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET all products
router.get('/', productsController.getAllProducts);

// GET a single product by ID
router.get('/:id', productsController.getSingleProduct);

// POST a new product (with validation)
router.post('/', productValidation, validate, productsController.createProduct);

// PUT (update) an existing product by ID (with validation)
router.put('/:id', productValidation, validate, productsController.updateProduct);

// DELETE a product by ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;