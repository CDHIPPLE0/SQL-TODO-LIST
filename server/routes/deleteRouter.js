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

router.delete('/:id', (req, res) => {
  const musicId = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE id=$1;`;
  const queryArrayData = [musicId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/complete/:id', (req, res) => {
  const completeStatus = req.body;
  console.log(completeStatus);
  const queryText = `UPDATE "tasks" SET complete=$1 WHERE id=$2;`;
  const queryArray = [completeStatus.complete, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warning(err);
      res.sendStatus(500);
    });
});

module.exports = router;
