const express = require('express');
const router = express.Router();
const { authRequired } = require('./utils');

const { createUser, loginUser, getUserById } = require('../db/sqlHelperFunctions/users');

// POST - api/users/register - create a new user
router.post('/', authRequired, async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

// POST - api/users/login - login a user
router.post('/', authRequired, async (req, res, next) => {
    try {
        const user = await loginUser(req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

// GET - /api/users/:id - get a single user by id
router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;