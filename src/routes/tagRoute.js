const express = require("express");
const Router = express.Router();

const {createTag} = require('../controllers/tagController');

//Create Tag

Router.post("/tags", createTag);
module.exports = Router;