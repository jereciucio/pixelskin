const Tag = require('../models/tagModel');
const UUID = require('uuid');


// Create Tag
const createTag = async (req, res) => {

    try {
	const newTagID = UUID.uidv4();
	const newTag = await Tag.create({ displayName: req.body.displayName, id: newTagID});
	res.status(200).json(newTag);
    } catch (err) {
	console.log(err.message);
	res.status(500).json({ message: err.message});
    }
}

module.exports = {
    createTag,
}
