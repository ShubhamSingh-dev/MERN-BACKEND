import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
} , {timestamps:true}) // timestamps will add createdAt and updatedAt fields

export const User = mongoose.model("User" , userSchema)