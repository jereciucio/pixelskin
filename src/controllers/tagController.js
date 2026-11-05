const Tag = require('../models/tagModel');
const validator = require('../services/tagValidator');

const uuid = require('uuid');
//const {v4 : uuidv4} = require('uuid')


// Create Tag
const createTag = async (req, res) => {

	try {
		const newTagID = uuid.v7();
		const newTagName = req.body.displayName.trim().toUpperCase();
		validator(newTagName);
		const newTag = await Tag.create({ displayName: newTagName, _id: newTagID });
		res.status(200).json(newTag);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: err.message });
	}
}

const getTags = async (req, res) => {
    try {
	const tags = await Tag.find({}).exec();
	res.json(tags);
    } catch (err) {
	console.log(err.message);
	res.status(500).json({message: err.message});
    }
};

const getTagById = async (req, res) => {
    try {
	const tag = await Tag.findById(req.params.tagid).exec();
	res.json(tag);
    } catch (err) {
	console.log(err.message);
	res.status(500).json({message: err.message});
    }
};

module.exports = {
    createTag,
    getTags,
    getTagById
}
const regexAlphanumeric = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/;
