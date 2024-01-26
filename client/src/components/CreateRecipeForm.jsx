import { useState } from "react";

export default function CreateRecipeForm(recipe) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientId, setIngredientId] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
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
        setName('')
        setDescription('')
        setIngredientId('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input placeholder="ingredientId" type="number" value={ingredientId} onChange={(e) => setIngredientId(e.target.value)} />
                <button type="submit">Create Recipe</button>
            </form>
        </>
    );
}
