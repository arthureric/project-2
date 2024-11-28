const jwt = require('jsonwebtoken');

// Your secret key
const secretKey = '9ee32c57220c9b4c63d6ecfa6d01e9e614699c642e7762dc4b7da114e0e2283b4ece838e586d13db781a531ef3baac334940c0e88d5aa37c3f10a7508809b1eb';

// Define a payload (this can include user information)
const payload = {
    userId: '12345', // Example user ID
    username: 'exampleUser',
};

// Set token options (e.g., expiration)
const options = {
    expiresIn: '1h', // Token will expire in 1 hour
};

// Generate the token
const token = jwt.sign(payload, secretKey, options);

console.log('Generated Access Token:', token);