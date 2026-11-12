const express = require("express");
const router = express.Router();
const {createUser, getUsers, getUserById} = require('../controllers/userController');
const validateUser = require('../validators/userValidator');

// Create User
router.post("/", validateUser, createUser);

// Get all Users
router.get("/", getUsers);

// Get user by id
router.get("/:tagid", getUserById);

module.exports = router;