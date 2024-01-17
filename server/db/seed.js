
// pulling in the connection to my local db
const client = require('./client')

const { user, recipe, ingredients } = require('./seedData')

// Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log('Starting to drop tables...')
        await client.query(`
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS recepie;
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
        CREATE TABLE user(
            "userId" SERIAL PRIMARY KEY,
            "recepieId" INTEGER REFERENCES recepie("recepieId") NOT NULL,
            name varchar(30) NOT NULL
            email varchar(30) NOT NULL

        );
        CREATE TABLES recepie (

        );
        CREATE TABLES recepie (

        )
        `)

        console.log('Tables built!')
    }catch(error) {
        console.error(error)
    }
}

// Populate tables to have data later


// Call all functions to build the db
const buildDb = async () => {
    try {
        // ACTUALLY CONNECT TO THE LOCAL DB
        client.connect()

        // run the functions
        await dropTables()
    } catch (error) {
        console.error(error)
    } finally {
        // close the connection to the local db. will always run
        client.end()
    }
}
buildDb()