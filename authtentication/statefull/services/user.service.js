import bcrypt from "bcrypt"; //used for hashing passwords
import {User} from "../models/user.model.js"

export const registerUser = async(username , password)=>{
    const hashedPassword = await bcrypt.hash(password , 10); //bcrypt hashing takes time / 10 is salt rounds
    const user = new User({username , password:hashedPassword});
    return await user.save()
}


export const loginUser = async(username , password)=>{
    const user = await User.findOne({username});

    if(!user || !(await bcrypt.compare(password , user.password))){
        throw new Error("Invalid Username or password")
    }

    return user

}