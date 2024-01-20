
// pulling in the connection to my local db
const client = require('./client')

const { users, recipes, ingredients } = require('./seedData')

// Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log('Starting to drop tables...')
        await client.query(`
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS recipe;
        DROP TABLE IF EXISTS ingredients
        `)
        console.log('Tables dropped')
    } catch (error) {
        console.log('Error dropping tables: ', error)
    }
}

// Create tables for the data
// Put in same order as mock data
// for foreign keys REFERENCES table("primary key")
const createTables = async () => {
    try {
        console.log('building tables...')
        await client.query(`
        CREATE TABLE ingredients (
            "ingredientId" SERIAL PRIAMRY KEY,
            protein varchar (20) NOT NULL,
            ingredient1 varchar(20) NOT NULL,
            ingredient2 varchar(20) NOT NULL
        );
        CREATE TABLE recepies (
            "recipeId" SERIAL PRIMARY KEY,
            "ingredientId" INTEGER REFERENCES ingredient("ingredientId") NOT NULL,
            name varchar(50) NOT NULL,
            description text NOT NULL
        );
        CREATE TABLE users(
            "userId" SERIAL PRIMARY KEY,
            "recipeId" INTEGER REFERENCES recepie("recepieId") NOT NULL,
            name varchar(30) NOT NULL,
            email varchar(30) NOT NULL,
            passowrd varchar(12) NOT NULL
        );
        `)
        console.log('Tables built!')
    }catch(error) {
        console.error(error)
    }
}

// Populate tables to have data later
// Create users
const createInitialUsers = async () => {
    try {
        for (const user of users) {
            const {
                rows: [user]
            } = await client.query(`
                INSERT INTO user("recipeId", name, email)
                VALUES($1, $2, $3);
            `, [user.recipeId, user.name, user.email]
            )
        }
        console.log("created users")
    } catch (error) {
        throw error
    }
}

// Create recipes
const createInitialRecipes = async () => {
    try {
        for (const recipe of recipes) {
            const {
                rows: [recipe]
            } = await client.query(`
                INSERT INTO recipe("ingredientId", name, description)
                VALUES($1, $2, $3);
            `, [recipe.ingredientId, recipe.name, recipe.description]
            )
        }
        console.log("created recipes")
    } catch (error) {
        throw error
    }
}

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
// Call all functions to build the db
const buildDb = async () => {
    try {
        // ACTUALLY CONNECT TO THE LOCAL DB
        client.connect()

        // run the functions
        await dropTables()
        await createTables()

        await createInitialUsers()
        await createInitialRecipes()
        await createInitialIngredients()

    } catch (error) {
        console.error(error)
    } finally {
        // close the connection to the local db. will always run
        client.end()
    }
}
buildDb()