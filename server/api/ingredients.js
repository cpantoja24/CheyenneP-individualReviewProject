const express = require('express');
const router = express.Router();
// const { authRequired } = require('./utils');

const { getAllIngredients, getIngredientById, createIngredient, deleteIngredientById } = require('../db/sqlHelperFunctions/ingredients');

// GET - /api/ingredients - get all ingredients
router.get('/', async (req, res, next) => {
    try {
        const ingredient = await getAllIngredients();
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});

// GET - /api/ingredients/:ingredientid - get a single ingredient by id
router.get('/:id', async (req, res, next) => {
    try {
        const ingredient = await getIngredientById(req.params.id);
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});

// POST - /api/ingredients - create a new ingredient
router.post('/', async (req, res, next) => {
    try {
        const ingredient = await createIngredient(req.body);
        res.send(ingredient);
    } catch (err) {
        next(err);
    }
});

// DELETE - /api/ingredients/:id - delete a single ingredient by id
router.delete('/:id', async (req, res, next) => {
    try {
        const ingredient = await deleteIngredientById(req.params.id);
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});
module.exports = router;