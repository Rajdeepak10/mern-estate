import User from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
export const signup = async (req,res)=>{
    const {username,email,password}= req.body
    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({username,email,password:hashedPassword})
    // we are using await as saving info in database takes time we our program will wait till info would be stored in database

    try {
        await newUser.save()
        res.status(201).json({
            message:"user created successfully"
        })
        
    } catch (error) {
        res.status(500).json(errpr.message)
        
    }

}