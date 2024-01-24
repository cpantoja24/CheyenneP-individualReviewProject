const client = require('../client');
const util = require('util');

// POST - api/users/register - create a new user
async function createUser(body) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2)
        RETURNING *;
        `, [body.name, body.email, body.password]);
        return user;
    } catch (error) {
        throw error;
    }
}

// POST - api/users/login - login a user
async function loginUser(body) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(email, password)
        VALUES($1, $2)
        RETURNING *;
        `, [body.email, body.password]);
        return user;
    } catch (error) {
        throw error;
    }
}

// GET - /api/users/:id - get a single user by id
async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE "userId" = $1;
        `, [id]);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserById
}