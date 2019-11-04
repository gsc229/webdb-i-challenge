const express = require('express');

const AccountsRouter = require('./accounts/AccountsRouter.js');
const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) =>
  res.send('<h3>DB HELPERS WITH KNEX</h3>')
);



module.exports = server;