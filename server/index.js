const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var dataRouter = require('./routes/data');
var manageRouter = require('./routes/manage');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/auth', authRouter);
app.use('/manage', manageRouter);

const server = app.listen(8000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
