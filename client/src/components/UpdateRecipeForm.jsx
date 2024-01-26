import { useState } from "react";

export default function UpdateRecipeForm(recipe) {
    const [recipeId, setRecipeId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientId, setIngredientId] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    recipeId: recipe.recipeId,
                    name: recipe.name,
                    description: recipe.description,
                    ingredientId: recipe.ingredientId
                })
            });
            const result = await response.json();
            console.log(result);
            return result
        } catch (err) {
            console.error(err);
        }

        // reset form after submission
        setRecipeId('')
        setName('')
        setDescription('')
        setIngredientId('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="recipeId" type="number" value={recipeId} onChange={(e) => setRecipeId(e.target.value)} />
                <input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input placeholder="ingredientId" type="number" value={ingredientId} onChange={(e) => setIngredientId(e.target.value)} />
                <button type="submit">Update Recipe</button>
            </form>
        </>
    );
}
