const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const TodoRoute = require('./api/router/todoroute');
const path = require('path');
const config = require('./config');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(config.url, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log('Error ', err);
  } else {
    console.log('Connected to Database');
  }
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PATCH DELETE');
    return res.status(200).json({});
  }
  next();
});
app.use('/todo', TodoRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error_status: error.status || 500,
    message: error.message
  });
});

app.listen(port, () => console.log(`Listen at port ${port}`));
