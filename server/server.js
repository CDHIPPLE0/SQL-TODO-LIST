const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/task', router);

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on Port', PORT);
});
