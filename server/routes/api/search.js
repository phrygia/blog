const express = require('express')
const router = express.Router()

// Model
const Post = require('../../models/post')

router.get('/:search_result', async (req, res, next) => {
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.search_result,
        $options: 'i',
      },
    })
    console.log('search result : ', result)
    res.send(result)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
