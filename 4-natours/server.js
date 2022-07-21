const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

const DB = process.env.DATABASE_CONNECT.replace(
  '<USER_NAME>',
  process.env.DATABASE_USER_NAME
).replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(DB);

mongoose
  .connect(DB, {
    userCreateIndex: true,
    userFindAndModify: true,
    userNewUrlParser: true
  })
  .then(
    () => {
      console.log('DB CONNECTION SUCCESSFULL 🆗');
    },
    err => console.log(err)
  );

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A TOUR MUST HAVE A NAME'],
    unique: [true, 'A tour with same name already exist']
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE PRICE']
  }
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'A Forest Hiker 2',
  rating: '4.6',
  price: '593'
});

testTour.save().then(
  doc => {
    console.log(doc);
  },
  err => console.log('ERROR 💥 ', err)
);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
