const express = require("express");
const router = express.Router();
const {createPost, getPost, getPostById} = require('../controllers/tagController');
const validatePost = require('../validators/postValidator');

// Create Tag
router.post("/", validatePost , createPost);

// Get all Tags
router.get("/", getPost);

// Get tag by id
router.get("/:postid", getPostById)

module.exports = router;
