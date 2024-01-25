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
            <p>Igredient ID: {recipe.ingredientId}</p>
            
            <br />
            <Link to={'/'}>Back to all Recipes</Link>
            <br />
        </div>
    );
}
