const mongoose = require('mongoose')
mongoose
  .connect('mongodb://0.0.0.0/social')
  .then((result) => {
    console.log('Connected to database')
  })
  .catch((err) => {})
