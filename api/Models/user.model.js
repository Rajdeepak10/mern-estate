import mongoose from "mongoose";


// creation of user schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true,
        required: true

    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true});


// creation of user model
const User = mongoose.model('User',userSchema)
export default User;
