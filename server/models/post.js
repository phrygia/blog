const mongoose = require('mongoose');
const moment = require('moment');

// create Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  fileUrl: {
    type: String,
    default: '',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  date: {
    type: String,
    default: moment().format('YYYY.MM.DD hh:mm:ss'),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
