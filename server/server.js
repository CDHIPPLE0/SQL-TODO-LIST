const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  log('listening on Port', PORT);
});
