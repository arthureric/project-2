const jwt = require('jsonwebtoken');

// Your secret key (ensure this is stored in an environment variable in production)
const secretKey = 'f1a59b4d0ac4487faafee3f5e02e64781c2237b91b3a521c4e0a6b8476f2a3c56e75c47f1bbf718a13e20c451bc902b8f467c5e039acbbd5b529c23798fdc7b9';

// Define a payload (this can include user information)
const payload = {
    userId: '1234567890', // Example user ID
    username: 'exampleUser',
};

// Set token options (e.g., expiration)
const options = {
    expiresIn: '1h', // Token will expire in 1 hour
};

// Generate the token
const token = jwt.sign(payload, secretKey, options);

console.log('Generated Access Token:', token);