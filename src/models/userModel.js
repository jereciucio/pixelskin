const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    userEmail: {type: String, required:true},
    userName: {type: String, required:true},
    passwordHash: {type: String, required:true},
    passwordSalt: {type: String, required:true},
    creationDate: {type: Date, required:true},
    deleteAt: {type: Date, default: null},
});

// Agregar un índice en el nombre, así evitamos username con nombres
// duplicados
userSchema.index({displayName: 1}, {unique: true});

// Establecer la forma en la que el modelo se va a pasar a JSON, para
// ocultar campos innecesarios al cliente como el deleteAt, passwordHash,
// passwordSalt, creationDate, deleteAt y el renombrado id para mayor prolijidad
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Crea el campo 'id' más limpio
        delete ret._id; // Sacamos el campo 'id' del Mongo
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.passwordSalt;
        delete ret.creationDate;
        delete ret.deletedAt;
        return ret;
    }
});

userSchema.methods.softDelete = async function() {
    this.deleteAt = new Date();
    return this.save();
}

const User = mongoose.model('User', userSchema);
module.exports = User;