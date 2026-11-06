const Tag = require('../models/tagModel');

const uuid = require('uuid');
//const {v4 : uuidv4} = require('uuid')


// Create Tag
const createTag = async (req, res, next) => {
    try {
	// Chequeamos si ya existe una etiqueta con ese nombre
	const exists = await Tag.exists({displayName: req.body.displayName});
	if (exists) {
	    // Si existe, devolvemos error
	    const err = new Error("A tag with that displayName already exists.");
	    err.status = 409; // 409: Conflict
	    return next(err);
	}

	// Si no existe, la creamos tranquilamente
	const newTagID = uuid.v7();
	const newTagName = req.body.displayName;
	const newTag = await Tag.create({ displayName: newTagName, _id: newTagID });
	res.status(201).json(newTag);
    } catch (err) {
	console.log(err.message);
	next(err);
    }
}

// Get all tags
const getTags = async (req, res) => {
    try {
	    const tags = await Tag.find({}).exec();
	    res.status(200).json(tags);
    } catch (err) {
	    console.log(err.message);
	    next(err);
    }
};

// Obtener tag por ID
const getTagById = async (req, res) => {
    try {
	const tag = await Tag.findById(req.params.id).exec();

	// Si no se encontró la tag, devuelve error 404
	if (!tag) {
	    const err = new Error("Not found.");
	    err.status = 404;
	    return next(err);
	}

	res.status(200).json(tag);
    } catch (err) {
	console.log(err.message);
	next(err);
};

module.exports = {
    createTag,
    getTags,
    getTagById
}
