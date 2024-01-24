const BASE_URL = `http://localhost:8080/api`;

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

export const fetchSingleRecipe = async (recipeId) => {
    try {
        const response = await fetch(`${BASE_URL}/${recipeId}`);
        const singleRecipe = await response.json();
        console.log(singleRecipe);

    } catch (err) {
        console.error(`Oh no, trouble fetching recipe #${recipeId}!`, err);
    }
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
    } catch (err) {
        console.error(
            `Whoops, trouble removing recipe #${recipeId}!`,
            err
        );
    }
};