const  express = require('express');

const server = express();
const usersRouter = require('./users/users-router');
const {logger} = require('./users/users-middleware');

server.use(express.json());

server.use('/api/users', usersRouter);

server.get('/', logger, (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

server.use('*', (req, res) => {
  res.status(404).json({message: `${req.method} ${req.baseUrl} not found`});
});

module.exports = server;