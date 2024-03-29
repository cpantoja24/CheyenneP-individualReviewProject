const client = require('../client');
const util = require('util');

// GET - /api/recipes - get all recipes
async function getAllRecipes() {
    try {
        const { rows: recipes } = await client.query(`SELECT * FROM recipes`);
        return recipes;
    } catch (error) {
        throw new Error("Error")
    }
}

// GET - /api/recipes/:recipeId - get a single recipe by id
async function getRecipeById(id) {
    try {
        const { rows: [recipe] } = await client.query(`
            SELECT * FROM recipes
            JOIN ingredients ON ingredients."ingredientId" = recipes."ingredientId"
            WHERE "recipeId" = $1;
        `, [id]);
        return recipe;
    } catch (error) {
        throw error;
    }
}

// POST - /api/recipes - create a new recipe
async function createRecipe(body) {
    try {
        const { rows: [recipe] } = await client.query(`
        INSERT INTO recipes(name, description, "ingredientId")
        VALUES($1, $2, $3)
        RETURNING *;
        `, [body.name, body.description, body.ingredientId]);
        return recipe;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/recipes/:recipeId - update a single recipe by id
async function updateRecipe(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [recipe] } = await client.query(`
      UPDATE recipes
      SET ${setString}
      WHERE "recipeId"=${id}
      RETURNING *;
    `, Object.values(fields));
        return recipe;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/recipes/:recipeId - delete a single recipe by id
async function deleteRecipe(id) {
    try {
        const { rows: [recipe] } = await client.query(`
      DELETE FROM recipes
      WHERE "recipeId"=$1
      RETURNING *;
    `, [id]);
        return recipe;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}