const express = require('express');
const router = express.Router();
const { authRequired } = require('./utils');

const { getAllIngredients, getIngredientById, createIngredient } = require('../db/sqlHelperFunctions/ingredients');

// GET - /api/ingredients - get all ingredients
router.get('/', async (req, res, next) => {
    try {
        const ingredient = await getAllIngredients();
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});

// GET - /api/ingredients/:id - get a single ingredient by id
router.get('/:id', async (req, res, next) => {
    try {
        const ingredient = await getIngredientById(req.params.id);
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});

// POST - /api/ingredients - create a new ingredient
router.post('/', authRequired, async (req, res, next) => {
    try {
        const ingredient = await createIngredient(req.body);
        res.send(ingredient);
    } catch (err) {
        next(err);
    }
});

module.exports = router;