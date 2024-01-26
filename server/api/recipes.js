const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../db/sqlHelperFunctions/recipes');

// GET - /api/recipes - get all recipes
router.get('/', async (req, res, next) => {
    try {
        const recipe = await getAllRecipes();
        res.send(recipe);
    } catch (error) {
        next(error);
    }
});

// GET - /api/recipes/:recipeId - get a single recipe by id
router.get('/:recipeId', async (req, res, next) => {
    try {
        const recipe = await getRecipeById(req.params.id);
        res.send(recipe);
    } catch (error) {
        next(error);
    }
});

// POST - /api/recipes - create a new recipe
router.post('/recipes', async (req, res, next) => {
    try {
        const {name, description, ingredientId} = req.body
        const recipe = await createRecipe({name, description, ingredientId});
        res.send(recipe);
    } catch (err) {
        next(err);
    }
});

// PUT - /api/recipes/:recipeId - update a single recipe by id
router.put('/recipes/:recipeId', async (req, res, next) => {
    try {
        const recipe = await updateRecipe(req.params.id, req.body);
        res.send(recipe);
    } catch (err) {
        next(err);
    }
});

// DELETE - /api/recipes/:recipeId - delete a single recipe by id
router.delete('/recipes/:recipeId', async (req, res, next) => {
    try {
        const recipe = await deleteRecipe(req.params.id);
        res.send(recipe);
    } catch (err) {
        next(err);
    }
});

module.exports = router;