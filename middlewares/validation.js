const { body, param, validationResult } = require('express-validator');

// Validation for creating a user
const createUserValidation = [
  // Validate the 'username' field
  body('username')
    .isString().withMessage('Username must be a string') // Ensure it's a string
    .notEmpty().withMessage('Username is required'), // Ensure it's not empty
  
  // Validate the 'email' field
  body('email')
    .isEmail().withMessage('Email must be valid') // Ensure it's a valid email
    .notEmpty().withMessage('Email is required'), // Ensure it's not empty
  
  // Validate the 'password' field
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Ensure password is at least 6 characters
    .notEmpty().withMessage('Password is required'), // Ensure it's not empty
  
  // Add any additional validations here as necessary
];

// Validation for updating a user
const updateUserValidation = [
  // Validate the 'id' parameter
  param('id').isMongoId().withMessage('Invalid user ID'), // Ensure it's a valid MongoDB ObjectId
  
  // Optional fields for updating the user
  body('username')
    .optional() // The username is optional for update
    .isString().withMessage('Username must be a string'), // Ensure it's a string if provided

  body('email')
    .optional() // The email is optional for update
    .isEmail().withMessage('Email must be valid'), // Ensure it's a valid email if provided

  body('password')
    .optional() // The password is optional for update
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Ensure it's long enough if provided
];

// Validation for getting a user by ID
const getSingleUserValidation = [
  // Validate the 'id' parameter
  param('id').isMongoId().withMessage('Invalid user ID'), // Ensure it's a valid MongoDB ObjectId
];

// Validation for deleting a user by ID
const deleteUserValidation = [
  // Validate the 'id' parameter for deletion
  param('id').isMongoId().withMessage('Invalid user ID'), // Ensure it's a valid MongoDB ObjectId
];

// Validation rules for product creation and updates
const productValidation = [
  // Validate the 'name' field
  body('name')
    .notEmpty().withMessage('Name is required') // Ensure 'name' is provided
    .isString().withMessage('Name must be a string') // Ensure it's a string
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'), // Ensure it's not too long

  // Validate the 'description' field
  body('description')
    .notEmpty().withMessage('Description is required') // Ensure 'description' is provided
    .isString().withMessage('Description must be a string') // Ensure it's a string
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'), // Ensure it's not too long
  
  // Validate the 'price' field
  body('price')
    .notEmpty().withMessage('Price is required') // Ensure 'price' is provided
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'), // Ensure it's a positive number

  // Validate the 'category' field
  body('category')
    .notEmpty().withMessage('Category is required') // Ensure 'category' is provided
    .isString().withMessage('Category must be a string') // Ensure it's a string
    .isLength({ max: 50 }).withMessage('Category must be less than 50 characters'), // Ensure it's not too long

  // Validate the 'stock' field
  body('stock')
    .notEmpty().withMessage('Stock is required') // Ensure 'stock' is provided
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'), // Ensure it's a non-negative integer
];

// Middleware to handle validation result
const validate = (req, res, next) => {
  // Get validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If errors are found, return a 400 response with error details
    return res.status(400).json({ errors: errors.array() });
  }
  // If no errors, proceed to the next middleware or route handler
  next();
};

// Exporting validation functions and middleware
module.exports = {
  createUserValidation,
  updateUserValidation,
  getSingleUserValidation,
  deleteUserValidation,
  validate,
  productValidation, // Ensure this is only declared once
};
