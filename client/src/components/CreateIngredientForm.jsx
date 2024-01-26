import { useState } from "react";

export default function CreateIngredientForm({ingredient}) {
    const [protein, setProtein] = useState('');
    const [ingredient1, setIngredient1] = useState('');
    const [ingredient2, setIngredient2] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    protein: protein,
                    ingredient1: ingredient1,
                    ingredient2: ingredient2
                })
            });
            const result = await response.json();
            console.log(result);
            return result
        } catch (err) {
            console.error(err);
        }

        // reset form after submission
        setProtein('')
        setIngredient1('')
        setIngredient2('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="Protein" type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
                <input placeholder="Ingredient 1" type="text" value={ingredient1} onChange={(e) => setIngredient1(e.target.value)} />
                <input placeholder="Ingredient 2" type="text" value={ingredient2} onChange={(e) => setIngredient2(e.target.value)} />
                <button type="submit">Create Ingredient</button>
            </form>
        </>
    );
}