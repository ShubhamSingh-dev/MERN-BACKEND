import { Schema, model } from "mongoose";

//creating a schema
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength:50
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//creating a model using the schema
const UserModel = model("User" ,userSchema );

export default UserModel;

// Step-2 Make models