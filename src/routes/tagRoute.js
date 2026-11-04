const express = require("express");
const router = express.Router();
const {createTag} = require('../controllers/tagController');

//Create Tag
router.post("/tags", createTag);
module.exports = router;