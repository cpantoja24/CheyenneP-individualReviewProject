const BASE_URL = `http://localhost:8080/api`;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const fetchAllRecipes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/recipes`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchAllIngredients = async () => {
    try {
        const response = await fetch(`${BASE_URL}/ingredients`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchSingleRecipe = async (recipeId) => {
    useEffect(() => {
        async function fetchSingleRecipe() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`);
                const recipe = await response.json();
                setRecipe(recipe)

            } catch (error) {
                console.error('Uh oh, trouble fetching single recipe!', error);
            }
        }
        fetchSingleRecipe()
        
    }, [])
};

export function SingleIngredient() {
    const { ingredientId } = useParams()

    useEffect(() => {
        async function fetchSingleIngredient() {
            try {
                const response = await fetch(`http://localhost:8080/api/ingredients/${ingredientId}`);
                const ingredient = await response.json();
                console.log(ingredient)

            } catch (error) {
                console.error('Uh oh, trouble fetching single ingredient!', error);
            }
        }
        fetchSingleIngredient()
    }, [])
};

export const addNewRecipe = async (recipe) => {
    try {
        const response = await fetch(`${BASE_URL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                ingredientId: recipe.ingredientId,
                name: recipe.name,
                description: recipe.description,
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
};

export const removeRecipe = async (recipeId) => {
    try {
        const response = await fetch(`${BASE_URL}/${recipeId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(
            `Whoops, trouble removing recipe #${recipeId}!`,
            err
        );
    }
};