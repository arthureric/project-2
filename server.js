const express = require('express');
const mongodb = require('./data/database');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config;
const {
    createUserValidation,
    updateUserValidation,
    getSingleUserValidation,
    deleteUserValidation,
    validate,
} = require('./middlewares/validation');

// Import routes
const userRoutes = require('./routes/index'); // Adjust the path to your user routes
const authRoutes = require('./routes/auth'); // Adjust the path to your auth routes (login, etc.)

const app = express();

// Swagger setup for API documentation
const swaggerUIPath = require('swagger-ui-express');
const swaggerjsonFilePath = require('./swagger-output.json');
app.use('/api-docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Routes setup
app.use('/api/auth', authRoutes); // Public routes for authentication
app.use('/api/', verifyToken, ); // Protected routes for user/products operations



app.get('/', (req, res) => {
    res.send('Hello Welcome to a New World');
});

// Handle non-existent routes and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

// Set port
const port = process.env.PORT || 5500;

// Initialize MongoDB connection and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening on port ${port}`);
        });
    }
});
