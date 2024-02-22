//Require client from pg
const { Client } = require('pg')

//Establishing the connection to the database (like how we do with http://)
const client = new Client(`postgres://recipe_r5hr_user:hg5PR7kdEMf4JDEJQKApZnuISngtehXj@dpg-cnbqci6n7f5s73ahpmm0-a/recipe_r5hr`)

//export for use in other files
module.exports = client
