const express = require("express");
const router = express.Router();
const {createTag, getTags, getTagById} = require('../controllers/tagController');

//Create Tag
router.post("/tags", createTag);

// Get all Tags
router.get("/tags", getTags);

// Get tag by id
router.get("/tags/:tagid", getTagById)

module.exports = router;
