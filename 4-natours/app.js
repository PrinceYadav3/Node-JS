const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

// MIDDLE WARES
// app.use(morgan('dev', { immediate: true }));
app.use(morgan('dev'));

app.use(express.json());

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

// START SERVER.
const port = 3000;
app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
