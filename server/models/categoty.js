const mongoose = require('mongoose')
const moment = require('moment')

// create Schema
const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        default: '미분류'
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

const Category = mongoose.model('category', CategorySchema)

module.exports = Category