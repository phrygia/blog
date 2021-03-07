const mongoose = require('mongoose')
const moment = require('moment')

// create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'SubAdmin', 'User'],
        default: 'User'
    },
    register_date: {
        type: Date,
        default: moment().format('YYYY-MM-DD hh:mm:ss')
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment'
            }
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

const User = mongoose.model('user', UserSchema)

module.exports = User