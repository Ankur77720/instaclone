const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
mongoose
  .connect('mongodb://0.0.0.0/instagram')
  .then((result) => {
    console.log('Connected to data base')
  })
  .catch((err) => {})
var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  dob: Date,
  pic: String,
  email: String,
  contact: String,
  post: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
    },
  ],
  savedPost: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('user', userSchema)
