import React, { useState, useEffect } from "react";

export default function Ingredients() {
    const [ingredient, setIngredient] = useState({})
    const [search, setSearch] = useState('')
  

    useEffect(() => {
        async function fetchAllIngredients() {
            try {
                const response = await fetch(`http://localhost:8080/api/ingredients`);
                const ingredient = await response.json();
                setIngredient(ingredient)

            } catch (error) {
                console.error('Uh oh, trouble fetching ingredients!', error);
            }
        }
        fetchAllIngredients()
    }, [])

    return (
        <>
            <br />
            <div>
            <form>
                <input placeholder="Type recipe name here..."
                onChange={(e) => setSearch(e.target.value)} />
            </form>
            </div>

            <div className="allCards">
                {Array.isArray(ingredient) && ingredient.filter((ingredient) =>
                search.toLowerCase() === '' ? true : ingredient.protein.toLowerCase().includes(search)
                ).map((ingredient) => (
                    <div key={ingredient.ingredientId} className="singleCard">
                        <h3>Protein: {ingredient.protein}</h3>
                        <p>{ingredient.ingredient1}</p>
                        <p>{ingredient.ingredient2}</p>
                        <br />
                        <p>Ingredient ID: {ingredient.ingredientId}</p>
                    </div>
                    ))}
            </div>
        </>
    );
}