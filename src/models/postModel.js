const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    _id: {type:String , require:true},
    displayName: {type:String, required:true},
    description: {type:String,required:true},
    viewCount: {type:Number, required:false, default: 0},
    skinImage: { 
            data:Buffer,
            contentType: String,
            required:true,
    },
    skinPreviewBack: {
        data: Buffer,
        contentType: String,
        required: true,
    },
    skinPreviewFront: {
            data:Buffer,
            contentType: String,
            required: true,
    },
    deletedAt: {type: Date, default: null},
    isSlim : {type:Booleano,required:true},
})

postSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.deletedAt;
        return ret;
    }
})

postSchema.methods.softDelete = async function (){
    this.deleteAt = new Date();
    return this.save();
}

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
