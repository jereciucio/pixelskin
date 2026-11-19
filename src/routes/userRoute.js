const express = require("express");
const router = express.Router();
const {createUser, getUsers, getUserById} = require('../controllers/userController');
const validateUser = require('../validators/userValidator');

// Crear Usuario
router.post("/", validateUser, createUser);

// Obtener todos los usuarios
router.get("/", getUsers);

// Obtener usuario por Id
router.get("/:userid", getUserById);

module.exports = router;