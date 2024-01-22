
// make some arrays of objects based on the schema created

// only need to include foreign keys, primary keys generate automatically
// users
const users = [
    {recipeId: 1, name: 'User1', email: 'User1@gmail.com', password: 'earlGrey'},
    {recipeId: 3, name: 'User2', email: 'User2@gmail.com', password: 'hamburglar'},
    {recipeId: 2, name: 'User3', email: 'User3@gmail.com', password: 'bestChili'}
]

// recepies
const recipes = [
    {ingredientId: 1, name: 'Salad', description: 'Lettuce'},
    {ingredientId: 2, name: 'Risotto', description: 'Rice'},
    {ingredientId: 3, name: 'Stew', description: 'Meat and potatoes'}
]

// ingredients
const ingredients = [
    {protein: 'Tofu', ingredient1: 'Romaine', ingredient2: 'Arugula'},
    {protein: 'Lentils', ingredient1: 'Arborio', ingredient2: 'Vegetable broth'},
    {protein: 'Beef', ingredient1: 'Potatoes', ingredient2: 'Beef broth'}
]

// export mock data variables for use elsewhere
module.exports= {users, recipes, ingredients}