import mongoose from "mongoose";
import { unique } from "underscore";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true  
    },
}, {timestamps: true});


export default mongoose.model("User", userSchema);