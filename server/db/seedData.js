
// make some arrays of objects based on the schema created

// only need to include foreign keys, primary keys generate automatically
// users
const user = [
    {name: 'User1', email: 'User1@gmail.com', password: 'earlGrey'},
    {name: 'User2', email: 'User2@gmail.com', password: 'hamburglar'},
    {name: 'User3', email: 'User3@gmail.com', password: 'bestChili'}
]

// recepies
const recipe = [
    {name: 'Salad', description: 'Lettuce'},
    {name: 'Risotto', description: 'Rice'},
    {name: 'Stew', description: 'Meat and potatoes'}
]

// ingredients
const ingredients = [
    {protein: 'Tofu', ingredient1: 'Romaine', ingredient2: 'Arugula'},
    {protein: 'Lentils', ingredient1: 'Arborio', ingredient2: 'Vegetable broth'},
    {protein: 'Beef', ingredient1: 'Potatoes', ingredient2: 'Beef broth'}
]

// export mock data variables for use elsewhere
module.exports= {user, recipe, ingredients}