const mongoose = require("mongoose");

// Función para transformar las imágenes a base64 al devolverlas;
const bufferToBase64 = (buffer) => {
    if (Buffer.isBuffer(buffer)) {
	return buffer.toString("base64");
    }
    // Manejar buffers ya serializados por mongo: { type: "Buffer", data: [...] }
    if (typeof buffer === "object" && buffer.type === "Buffer" && Array.isArray(buffer.data)) {
        return Buffer.from(buffer.data).toString("base64");
    }
    return buffer;
}

const postSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String, required: true },
    viewCount: { type: Number, required: false, default: 0 },
    skinImage: {
        type: {
            data: { type: Buffer, required: true },
            contentType: { type: String, required: true }
        },
        required: true
    },
    skinPreviewBack: {
        type: {
            data: { type: Buffer, required: true },
            contentType: { type: String, required: true }
        },
        required: true
    },
    skinPreviewFront: {
        type: {
            data: { type: Buffer, required: true },
            contentType: { type: String, required: true }
        },
        required: true
    },
    deletedAt: { type: Date, default: null },
    isSlim: { type: Boolean, required: true }
});

postSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.deletedAt;
	delete ret.skinImage._id;
	delete ret.skinPreviewFront._id;
	delete ret.skinPreviewBack._id;

	// Recodificar las imágenes a Base64 antes de devolverlas
	ret.skinImage.data = bufferToBase64(ret.skinImage.data);
	ret.skinPreviewFront.data = bufferToBase64(ret.skinPreviewFront.data);
	ret.skinPreviewBack.data = bufferToBase64(ret.skinPreviewBack.data);
        return ret;
    }
})

postSchema.methods.softDelete = async function (){
    this.deleteAt = new Date();
    return this.save();
}

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
