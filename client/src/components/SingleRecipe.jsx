import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SingleRecipe() {
    const [recipe, setRecipe] = useState({})
    const { recipeId } = useParams()

    useEffect(() => {
        async function fetchSingleRecipe() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`);
                const recipe = await response.json();
                setRecipe(recipe)
console.log(recipe)
            } catch (error) {
                console.error('Uh oh, trouble fetching single recipe!', error);
            }
        }
        fetchSingleRecipe()
    }, [])
   
    return (
        <div>
            <h2>Recipe Details</h2>
            
            <h3>{recipe.name}</h3>
            <h3>Description:</h3>
            <p>{recipe.description}</p>
            <p>Ingredient ID: {recipe.ingredientId}</p>
            <SingleIngredient/>
            
            <br />
            <Link to={'/'}>Back to all Recipes</Link>
            <br />
        </div>
    );
}

export function SingleIngredient(ingredientId) {
    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        async function fetchSingleIngredient() {
            try {
                const response = await fetch(`http://localhost:8080/api/ingredients/${ingredientId}`);
                const ingredient = await response.json();
                setIngredient(ingredient)
                console.log(ingredient)
            } catch (error) {
                console.error('Uh oh, trouble fetching single ingredient!', error);
            }
        }
        fetchSingleIngredient()
    }, [])
console.log(ingredient)
    return (
        <>
            <h4>Ingredients</h4>
            <p>Protein: {ingredient.protein}</p>
            <p>Ingredient 1: {ingredient.ingredient1}</p>
            <p>Ingredient 2: {ingredient.ingredient2}</p>
        </>
    );
}

