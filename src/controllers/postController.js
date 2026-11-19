const Post = require('../models/postModel');
const uuid = require('uuid');

const createPost = async (req, res, next) => {
    try {
        const exists = await Post.exists({ displayName: req.body.displayName });
        if (exists) {
            const err = new Error("A post with that displayName already exists.");
            err.status = 409;
            return next(err);
        }
        const newPostID = uuid.v7();
        const newPostName = req.body.displayName;
        const newPost = await Post.create({ displayName: newPostName, 
            _id: newPostID, 
            description: req.body.description, 
            skinType: req.body.skinType, 
        });
       
       
       
            res.status(201).json(newPost);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

// Obtener todas las etiquetas


const getPost = async (req, res,next) => {
    try {

        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10,1),100);
        const offset = (page - 1)*limit;

        const posts = await Post.find({}).sort({_id:-1})
        .skip(offset)
        .limit(limit)
        .exec();

        res.status(200).json(posts);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

//Obtener post por ID
const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.query._id, {$inc: {viewCount:1}}, 
            {returnDocument:'after'});
        if (!post) {
            const err = new Error("Not found.");
            err.status = 404;
            return next(err);
        }
        res.status(200).json(post);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};


module.exports = {
    createPost,
    getPost,
    getPostById,
}