const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {

  knex.select('*').from('accounts')
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to get account from database' });
    })

});


router.get('/:id', (req, res) => {
  knex.select('*').from('accounts').where('id', '=', req.params.id)
    .first()
    .then(post => { res.status(200).json(post) })
    .catch(err => res.status(500).json({ err: "SOmething went wrong" }))

});

router.post('/', (req, res) => {
  knex.insert(req.body, 'id')
    .into('accounts')
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ err: "SOmething went wrong" }))
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  knex('accounts')
    .where({ id: id })
    .update(changes)
    .then(count => res.status(200)
      .json(count))
    .catch(err => res.status(500).json({ err: "Something went wrong" }))
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  knex('accounts')
    .where({ id: id })
    .del()
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({ error: "Something went wrong" }))

});


module.exports = router;