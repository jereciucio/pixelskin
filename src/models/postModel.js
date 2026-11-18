const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    _id: {type:String , require:true},
    displayName: {type:String, require:true},
    description: {type:String,require:true},
    viewCount: {type:Number, require:false},
        skinImage: { 
            data:Buffer,
            contentType: 'image/png'},
    deletedAt: {type: Date, default: null},
    skinType: {type: Number , require:true}, 
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
