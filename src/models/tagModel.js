const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    displayName: {type: String, required:true},
    deletedAt: {type: Date, default: null},
});

tagSchema.methods.softDelete = async () => {
    this.deleteAt = new Date();
    return this.save();
}



const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
String