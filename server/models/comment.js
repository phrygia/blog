const mongoose = require('mongoose')
const moment = require('moment')

// create Schema
const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format('YYYY.MM.DD hh:mm:ss'),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  creator_name: {
    type: String,
  },
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment
