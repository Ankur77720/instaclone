const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
mongoose
  .connect('mongodb://0.0.0.0/instagram')
  .then((result) => {
    console.log('Connected to dataBase')
  })
  .catch((err) => {})

var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  profilePic: String,
  email: String,
  contactNumber: String,
  address: String,
  password: String,
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

  posts: [
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
  save: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
    },
  ],
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('user', userSchema)
