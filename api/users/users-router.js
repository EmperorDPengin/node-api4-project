const express = require('express');

const Users = require('./users-model');
const { logger, handleError, validateUser } = require("./users-middleware");

const router = express.Router();

router.get('/',logger, (req, res, next) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.post('/register', logger, validateUser,  (req, res, next) => {
    Users.addUser(req.body)
        .then(newUser => {
            res.status(200).json(newUser);
        })
        .catch(next)
});

router.post('/login', logger, validateUser,  (req, res, next) => {
    Users.findBy(req.body.username)
        .then( logUser => {
            if (logUser == null || logUser.password != req.body.password) {
                next({ status: 404, message: 'Invalid Credentials'})
                return;
            }

            res.status(201).json(`Welcome Back, ${logUser.username}`);
            // next()

        })
        .catch(next)
});


router.use(handleError);

module.exports = router;