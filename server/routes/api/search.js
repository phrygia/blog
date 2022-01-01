const express = require('express');
const router = express.Router();

// Model
const Post = require('../../models/post');

router.get('/:search_result', async (req, res, next) => {
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.search_result,
        $options: 'i',
      },
    });
    res.send(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
