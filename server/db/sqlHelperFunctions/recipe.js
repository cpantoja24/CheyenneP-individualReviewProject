const client = require('./client');
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

// GET - /api/recipes/:id - get a single recipe by id
async function getRecipeById(id) {
    try {
        const { rows: [recipe] } = await client.query(`
            SELECT * FROM recipes
            WHERE id = $1;
        `, [id]);
        return recipe;
    } catch (error) {
        throw error;
    }
}

// POST - /api/recipes - create a new recipe
async function createRecipe(rec) {
    try {
        const { rows: [recipe] } = await client.query(`
        INSERT INTO recipes(name, description)
        VALUES($1, $2)
        RETURNING *;
        `, [rec.name, rec.description]);
        return recipe;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/recipes/:id - delete a single recipe by id
async function deleteRecipe(id) {
    try {
        const { rows: [recipe] } = await client.query(`
      DELETE FROM recipes
      WHERE id=$1
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
    deleteRecipe
}