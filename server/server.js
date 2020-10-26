const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const putGetRouter = require('./routes/putGetRouter.js');
const deleteRouter = require('./routes/deletePutRouter.js');
const time = require('./routes/time.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/task', putGetRouter);
app.use('/taskTable', deleteRouter);
app.use('/taskTime', time);

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on Port', PORT);
});
