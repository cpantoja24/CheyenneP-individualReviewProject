const client = require('../client');
const util = require('util');

// GET - /api/ingredients - get all ingredients
async function getAllIngredients() {
    try {
        const { rows: ingredients } = await client.query(`SELECT * FROM ingredients`);
        return ingredients;
    } catch (error) {
        throw new Error("error")
    }
}

// GET - /api/ingredients/:id - get a single ingredient by id
async function getIngredientById(id) {
    try {
        const { rows: [ingredient] } = await client.query(`
            SELECT * FROM ingredients
            WHERE id = $1;
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
        `, [body.protein, body.ingredient1, body.ingredient1]);
        return ingredient;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient
}