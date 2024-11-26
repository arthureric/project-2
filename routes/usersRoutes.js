const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const {
  createUserValidation,
  updateUserValidation,
  getSingleUserValidation,
  deleteUserValidation,
  validate,
} = require('../middlewares/validation'); // Adjust the path as needed

// Create a new user (POST)
router.post('/', createUserValidation, validate, userController.createUser);

// Get all users (GET)
router.get('/', userController.getAllUsers);

// Get a single user by ID (GET)
router.get('/:id', getSingleUserValidation, validate, userController.getSingleUser);

// Update a user by ID (PUT)
router.put('/:id', updateUserValidation, validate, userController.updateUser);

// Delete a user by ID (DELETE)
router.delete('/:id', deleteUserValidation, validate, userController.deleteUser);

module.exports = router;