const express = require('express');
const router = express.Router();
// const { authRequired } = require('./utils');

const { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredientById } = require('../db/sqlHelperFunctions/ingredients');

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
router.get('/ingredients/:ingredientId', async (req, res, next) => {
    try {
        const ingredient = await getIngredientById(req.params.id);
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});

// POST - /api/ingredients - create a new ingredient
router.post('/ingredients', async (req, res, next) => {
    try {
        const {protein, ingredient1, ingredient2} = req.body
        const ingredient = await createIngredient({protein, ingredient1, ingredient2});
        res.send(ingredient);
    } catch (err) {
        next(err);
    }
});

// PUT - /api/ingredient/:ingredientid - update a single ingredient by id
router.put('/ingredient/:ingredientId', async (req, res, next) => {
    try {
        const ingredient = await updateIngredient(req.params.id, req.body);
        res.send(ingredient);
    } catch (err) {
        next(err);
    }
});

// DELETE - /api/ingredients/:ingredientId - delete a single ingredient by id
router.delete('/ingredients/:ingredientId', async (req, res, next) => {
    try {
        const ingredient = await deleteIngredientById(req.params.id);
        res.send(ingredient);
    } catch (error) {
        next(error);
    }
});
module.exports = router;