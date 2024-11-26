
const router = require('express').Router();


router.get('/', (req, res) => { res.send('Hello World One');});

router.use('/users', require('./usersRoutes'));

router.use('/products', require('./productsRoutes'));



module.exports = router; 