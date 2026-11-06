const express = require("express");
const router = express.Router();
const {createTag, getTags, getTagById} = require('../controllers/tagController');
const validateTag = require('../validators/tagValidator');

// Create Tag
router.post("/", validateTag , createTag);

// Get all Tags
router.get("/", getTags);

// Get tag by id
router.get("/:tagid", getTagById)

module.exports = router;
