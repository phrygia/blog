const express = require('express')
const auth = require('../../middleware/auth')

// Model 
const Post = require('../../models/post')

const router = express.Router()

// api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find()
    console.log(postFindResult, 'All post get')

    res.json(postFindResult)
})

router.post('/', auth, async(req, res, next) => {
    try {
        console.log(req, '-> req')
        const { title, contents, fileUrl, creator } = req.body
        const newPost = await Post.create({ 
            title,
            contents,
            fileUrl,
            creator
        })
        res.json(newPost)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router