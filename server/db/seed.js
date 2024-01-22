
// pulling in the connection to my local db
const client = require('./client')

const { users, recipes, ingredients } = require('./seedData')

// Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log('Starting to drop tables...')
        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS ingredients CASCADE;
        `)
        console.log('Tables dropped!')
    } catch (error) {
        console.log('Error dropping tables: ', error)
    }
}

// Create tables for the data
// Put in same order as mock data
// for foreign keys REFERENCES table("primary key")
const createTables = async () => {
    try {
        console.log('Building tables...')
        await client.query(`
        CREATE TABLE ingredients (
            "ingredientId" SERIAL PRIMARY KEY,
            protein varchar (20) NOT NULL,
            ingredient1 varchar(20) NOT NULL,
            ingredient2 varchar(20) NOT NULL
        );
        CREATE TABLE recipes (
            "recipeId" SERIAL PRIMARY KEY,
            "ingredientId" INTEGER REFERENCES ingredients("ingredientId") NOT NULL,
            name varchar(50) NOT NULL,
            description text NOT NULL
        );
        CREATE TABLE users(
            "userId" SERIAL PRIMARY KEY,
            "recipeId" INTEGER REFERENCES recipes("recipeId") NOT NULL,
            name varchar(30) NOT NULL,
            email varchar(30) NOT NULL,
            password varchar(12) NOT NULL
        );
        `)
        console.log('Tables built!')
    }catch(error) {
        console.error(error)
    }
}

// Populate tables to have data later
// Create ingredients
const createInitialIngredients = async () => {
    try {
        for (const ingredient of ingredients) {
            const {
                rows: [ingredients]
            } = await client.query(`
                INSERT INTO ingredients(protein, ingredient1, ingredient2)
                VALUES($1, $2, $3);
            `, [ingredient.protein, ingredient.ingredient1, ingredient.ingredient2]
            )
        }
        console.log("created ingredients")
    } catch (error) {
        throw error
    }
}

// Create recipes
const createInitialRecipes = async () => {
    try {
        for (const recipe of recipes) {
            const {
                rows: [recipes]
            } = await client.query(`
                INSERT INTO recipes("ingredientId", name, description)
                VALUES($1, $2, $3);
            `, [recipe.ingredientId, recipe.name, recipe.description]
            )
        }
        console.log("created recipes")
    } catch (error) {
        throw error
    }
}

// Create users
const createInitialUsers = async () => {
    try {
        for (const user of users) {
            const {
                rows: [users]
            } = await client.query(`
                INSERT INTO users("recipeId", name, email, password)
                VALUES($1, $2, $3, $4);
            `, [user.recipeId, user.name, user.email, user.password]
            )
        }
        console.log("created users")
    } catch (error) {
        throw error
    }
}

// Call all functions to build the db
const buildDb = async () => {
    try {
        // ACTUALLY CONNECT TO THE LOCAL DB
        client.connect()

        // run the functions
        await dropTables()
        await createTables()

        await createInitialIngredients()
        await createInitialRecipes()
        await createInitialUsers()
        
    } catch (error) {
        console.error(error)
    } finally {
        // close the connection to the local db. will always run
        client.end()
    }
}
buildDb()