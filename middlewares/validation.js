const { body, param, validationResult } = require('express-validator');

// Validation for creating a user
const createUserValidation = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required'),
  body('email')
    .isEmail().withMessage('Email must be valid')
    .notEmpty().withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
  // Add any additional validations as necessary
];

// Validation for updating a user
const updateUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('username')
    .optional()
    .isString().withMessage('Username must be a string'),
  body('email')
    .optional()
    .isEmail().withMessage('Email must be valid'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation for getting a user by ID
const getSingleUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

// Validation for deleting a user by ID
const deleteUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

// Validation rules for product creation and updates
const productValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),
    
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    
    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string')
        .isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
    
    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

// Middleware to handle validation result
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createUserValidation,
    updateUserValidation,
    getSingleUserValidation,
    deleteUserValidation,
    validate,
    productValidation, // Ensure this is only declared once
};
