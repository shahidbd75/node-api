const express = require('express');
const { body } =  require('express-validator');

const router = express.Router();

const feedController = require('../controllers/feedController');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', [
    body('title').trim().isLength({min:3}),
    body('content').trim().isLength({min:5})
], feedController.createPosts);

router.get('/post/:postId', feedController.getPost);

module.exports = router;