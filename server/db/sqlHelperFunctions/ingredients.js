const client = require('../client');
// const util = require('util');

// GET - /api/ingredients - get all ingredients
async function getAllIngredients() {
    try {
        const { rows: ingredients } = await client.query(`SELECT * FROM ingredients`);
        return ingredients;
    } catch (error) {
        throw new Error("error")
    }
}

// GET - /api/ingredients/:ingredientId - get a single ingredient by id
async function getIngredientById(id) {
    try {
        const { rows: [ingredient] } = await client.query(`
            SELECT * FROM ingredients
            WHERE "ingredientId" = $1;
        `, [id]);
        return ingredient;
    } catch (error) {
        throw error;
    }
}

// POST - /api/ingredients - create a new ingredient
async function createIngredient(body) {
    try {
        const { rows: [ingredient] } = await client.query(`
        INSERT INTO ingredients(protein, ingredient1, ingredient2)
        VALUES($1, $2, $3)
        RETURNING *;
        `, [body.protein, body.ingredient1, body.ingredient2]);
        return ingredient;
    } catch (error) {
        throw error;
    }
}
// PUT - /api/ingredients/:ingredientId - update a single ingredient by id
async function updateIngredient(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [ingredient] } = await client.query(`
      UPDATE ingredients
      SET ${setString}
      WHERE "ingredientId"=${id}
      RETURNING *;
    `, Object.values(fields));

        return ingredient;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/ingredients/:ingredientId - delete a single ingredient by id
async function deleteIngredientById(id) {
    try {
        const { rows: [ingredient] } = await client.query(`
      DELETE FROM ingredients
      WHERE "ingredientId"=$1
      RETURNING *;
    `, [id]);
        return ingredient;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredientById
}