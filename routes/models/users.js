const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

let userSchema = mongoose.Schema({
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
  username: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
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
  pic: String,
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('user', userSchema)
