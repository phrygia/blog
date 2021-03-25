const express = require('express')
const auth = require('../../middleware/auth')
const moment = require('moment')
require('@babel/polyfill')

// Model
const Post = require('../../models/post')
const Category = require('../../models/categoty')
const User = require('../../models/user')
const Comment = require('../../models/comment')

const router = express.Router()

const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
const { isNullOrUndefined } = require('util')
const { PresignedPost } = require('aws-sdk/clients/s3')
dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.AWS_REGION,
})

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'phrygiablog/upload',
    key(req, file, cb) {
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext)
      cb(null, basename + new Date().valueOf() + ext)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

// @route       POST api/post/image
// @desc        Create a Post
// @access      Private
router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => {
  try {
    // console.log(req.files.map((v) => v.location))
    res.json({ uploaded: true, url: req.files.map((v) => v.location) })
  } catch (e) {
    w
    console.error(e)
    res.json({ uploaded: false, url: null })
  }
})

// @route       Get api/post
// @desc        More laading posts
// @access      Public
router.get('/skip/:skip', async (req, res) => {
  try {
    const postCount = await Post.countDocuments()
    const postFindResult = await Post.find().skip(Number(req.params.skip)).limit(6).sort({ date: -1 }) //가장 최신
    const categoryFindResult = await Category.find()
    const result = { postFindResult, categoryFindResult, postCount }

    res.json(result)
  } catch (e) {
    console.log(e)
    res.json({ msg: '더 이상 포스트가 없습니다.' })
  }
})

// @route       POST api/posta
// @desc        Create a Post
// @access      Private
router.post('/', auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, '-> req')
    const { title, contents, fileUrl, creator, category } = req.body
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format('YYYY.MM.DD hh:mm:ss'),
    })

    const findResult = await Category.findOne({
      category_name: category,
    })

    console.log(findResult, 'FindResult!')

    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        category_name: category,
      })
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      })
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      })
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      })
    } else {
      //카테고리가 존재하면
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      })
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      })
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      })
    }
    return res.redirect(`/api/post/${newPost._id}`)
  } catch (e) {
    console.log(e)
  }
})

// @route       POST api/post/:id
// @desc        Detail Post
// @access      Public
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('creator', 'name')
      .populate({ path: 'category', select: 'category_name' })
    // console.log(post)
    res.json(post)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// @route       Get api/post/:id/comments
// @desc        Get all comments
// @access      Public
router.get('/:id/comments', async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: 'comments',
    })
    const result = comment.comments
    // console.log(result, 'comment load')
    res.json(result)
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

router.post('/:id/comments', async (req, res, nest) => {
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creator_name: req.body.userName,
    post: req.body.id,
    date: moment().format('YYYY.MM.DD hh:mm:ss'),
  })
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    })
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    })
    res.json(newComment)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// @route       Delete api/post/:id
// @desc        Delete a Post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id })
  await Comment.deleteMany({ post: req.params.id })
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  })
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  )

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult })
  }
  return res.json({ success: true })
})

// @route       Get api/post/:id/deit
// @desc        Edit Post
// @access      Private
router.get('/:id/edit', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('creator', 'name')
    res.json(post)
  } catch (e) {
    console.error(e)
  }
})

// post
router.post('/:id/edit', async (req, res, next) => {
  console.log(req, '/api/post/:id/deit')
  const {
    body: { title, contents, fileUrl, id },
  } = req

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format('YYYY.MM.DD hh:mm:ss'),
      },
      { new: true }
    )
    res.redirect(`/api/post/${modified_post.id}`)
  } catch (e) {
    next(e)
  }
})

router.get('/category/:category_name', async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        category_name: {
          $regex: req.params.category_name,
          $options: 'i',
        },
      },
      'posts'
    ).populate({ path: 'posts' })
    res.send(result)
  } catch (e) {
    next(e)
  }
})

module.exports = router
