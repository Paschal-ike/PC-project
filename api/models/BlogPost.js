import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },
}, {timestamps: true});

export default mongoose.model("BlogPost", blogPostSchema);