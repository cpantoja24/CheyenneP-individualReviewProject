const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/ingredients
router.use('/ingredients', require('./ingredients'));

// ROUTER: /api/recipes
router.use('/recipes', require('./recipes'));

// ROUTER: /api/users
router.use('/users', require('./users'));

module.exports = router;