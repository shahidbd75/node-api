const Post = require('../models/feed');

const { validationResult } = require('express-validator');
exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({
            message:'Posts fetched',
            posts: posts
        });
    }).catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.createPosts = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // return res.status(422).json({
        //     message: 'Validation failed, entered data is incorrect',
        //     errors: errors.array()
        // });
        const error = new Error('Validation Failed For create Post');
        error.statusCode = 422;
        throw error;
    }

    // const post = new Post({
    //     title :req.body.title,
    //     imageUrl:'images/duck.jpg',
    //     content: req.body.content,
    //     creator: req.body.creator
    // });

    // post.save().then((result) => {
    //     res.status(201).json({
    //         message: "Post is created successfully",
    //         post : result
    //     });
    //     console.log(result);
    // }).catch(err=> {
    //     console.log(err);
    // });

    Post.create(req.body).then(result=> {
        res.status(201).json({
            message: "Post is created successfully",
            post : result
        });
        console.log(result);
    }).catch(err => {
        //console.log(err);
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getPost = (req,res,next) => {
    const postId = req.params.postId;
    Post.findById(postId).then((result) => {
        if(!result) {
            const error = new Error(`Couldn't find post.`);
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Post fetched successfully',
            post: result
        })
    }).catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}