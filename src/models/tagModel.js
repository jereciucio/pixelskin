const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    id: String,
    displayName: String
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
