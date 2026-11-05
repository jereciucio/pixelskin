const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    displayName: {type: String, required:true},
    deletedAt: {type: Date, default: null},
});

// Establecer la forma en la que el modelo se va a pasar a JSON, para
// ocultar campos innecesarios al cliente como el deletedAt y
// renombrando id para mayor prolijidad
tagSchema.set('toJSON', {
    transform: (doc, ret) => {
	ret.id = ret._id; // Crear el campo 'id' mas limpio
	delete ret._id; // Sacamos el campo 'id' de Mongo
	delete ret.__v;
	delete ret.deletedAt;
	return ret;
    }
})

tagSchema.methods.softDelete = async function () {
    this.deleteAt = new Date();
    return this.save();
}

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
