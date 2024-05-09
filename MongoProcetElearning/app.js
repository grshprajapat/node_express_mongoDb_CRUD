const express = require('express');
const mongoose = require('mongoose');
const category = require('./routes/category');
const students = require('./routes/students');
const app = express();

mongoose
  .connect('mongodb://localhost/testDatase')
  .then(() => console.log('mongo is conncected'))
  .catch((error) => console.log('connection Failed', error));

app.use(express.json());
app.use(category);
app.use('/api/students/',students);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
