require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT; // process.env

// error handler import
const handle = require('./handlers/index');

// db
const db = require('./models');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ hello: 'hello world' });
});

// not found error
app.use(handle.notFound);

// error handler
app.use(handle.errorHandler);

app.listen(
  port,
  console.log(`Server working at ${port} at ${process.env.NODE_ENV}`),
);
