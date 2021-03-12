const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/index')
const { JWT_SECRET } = config

// model
const User = require('../../models/user')

const router = express.Router()

// @routs       GET api/user
// @desc        GET all user
// @access      public

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if (!users) throw Error('No users')
    res.status(200).json(users)
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: e.message })
  }
})

// @routs       POST api/user
// @desc        Register all user
// @access      public

router.post('/', async (req, res) => {
  const { name, email, password } = req.body

  console.log(req.body)

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: '모든 필드를 채워주세요.' })
  }

  //check for exising user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: '이미 가입된 유저입니다.' })
    const newUser = new User({
      name,
      email,
      password,
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 }, //만기일
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              })
            }
          )
        })
      })
    })
  })
})

module.exports = router
