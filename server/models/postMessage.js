import mongoose from "mongoose";

// basiclly sql schema
const postSchema = mongoose.Schema({
    title:String,
    message: String,
    creator: String,
    name: {type:String,required:true},
    tags: [String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model("PostMessage",postSchema)

export default PostMessage;