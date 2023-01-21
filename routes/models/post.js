const mongoose = require('mongoose')

let postSchema = mongoose.Schema({
  owner: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment',
    },
  ],
  bookMarked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  tagPersons: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  caption: String,
  post: String,
})

module.exports = mongoose.model('post', postSchema)
