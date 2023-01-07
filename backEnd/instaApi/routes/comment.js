const mongoose = require('mongoose')
var commentSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'post',
  },
  date: String,
  data: String,
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
})

module.exports = mongoose.model('comment', commentSchema)
