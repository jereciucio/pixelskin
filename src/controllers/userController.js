const User = require('../models/userModel');

const uuid = require('uuid');

// Create User

const createUser = async (req, res, next) => {
    try {
        // Chequeamos si ya existe un usuario con ese nombre
        const exists = await User.exists({userName: req.body.userName});
        if (exists) {
            // Si ya existe, devolvemos error
            const err = new Error("A user with that name already exists.");
            err.status = 409; // 409: Conflict
            return next(err);
        }

        // Si no existe, lo creamos
        const newUserID = uuid.v7();
        const newUserName = req.body.userName;
        const newUserEmail = req.body.userEmail;
        const newUserPasswordHash = req.body.passwordHash; // Definir bien
        const newUserPasswordSalt = req.body.passwordSalt; // Definir bien
        const newCreationDate = req.body.creationDate; // Definir bien
        const newUser = await User.create({
            userName: newUserName,
            _id: newUserID,
            userEmail: newUserEmail,
            userPasswordHash: newUserPasswordHash,
            userPasswordSalt: newUserPasswordSalt,
            creationDate: newCreationDate
        });
        res.status(201).json(newUser);

    } catch (err) {
        console.log(err.message);
        next(err);
    }
}

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userid).exec();
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById
}

