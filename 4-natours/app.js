const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

// MIDDLE WAR
// app.use(morgan('dev', { immediate: true }
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello From Middle Ware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

// START SERVER
module.exports = app;
