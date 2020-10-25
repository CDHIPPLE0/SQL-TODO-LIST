const express = require('express');
const router = express.Router();
const pg = require('pg');

const config = {
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 10000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('postgresql connected!!!');
});

pool.on('error', (error) => {
  console.log('Error connecting to db', error);
});

router.post('/', function (req, res) {
  const data = req.body;
  const query = `INSERT INTO "tasks" ("task", "complete") VALUES ($1, $2);`;
  pool
    .query(query, [data.task, data.complete])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in post', error);
      res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks";';
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch;
});

module.exports = router;
