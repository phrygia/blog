const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// model
const User = require('../../models/user')

const router = express.Router()

// @routs       GET api/user
// @desc        GET all user
// @access      public

router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        if(!users) throw Error('No users')
        res.status(200).json(users)
    } catch(e) {
        console.log(e)
        res.status(400).json({ msg: e.message })
    }
})