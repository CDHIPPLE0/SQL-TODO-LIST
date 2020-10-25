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

router.put('/time/:id', (req, res) => {
  const obj = req.body;
  console.log(req.params.id);
  console.log(obj);
  const queryText = `UPDATE "tasks" SET time=$1 WHERE id=$2;`;
  const queryArray = [obj.time, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
