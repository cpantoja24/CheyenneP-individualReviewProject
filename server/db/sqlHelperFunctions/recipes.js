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

// PUT - /api/recipes/:id - update a single recipe by id
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
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

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
    updateRecipe,
    deleteRecipe
}