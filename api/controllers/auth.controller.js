import User from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js"
export const signup = async (req,res,next)=>{
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
        next(error);
    }

}
export const signin = async(req,res,next)=>{
    const {email,password}=req.body
    try {
        const validUser = await User.findOne({email:email})
        if(!validUser){
            return next(errorHandler(404,'User Not Found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(401,'Invalid Password'))
        }
        // we don not want to send password with cookie
        const {password:pass,...rest} = validUser._doc
        // after this we can use rest as object without exposing our password 
        // and pass variable is used to refernce the password without directly exposing itself

        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        // saaving this token as cookie
        // by httpOnly we are limiting our token to just our app no third party app
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)



        // as we are confirm that both the email and password of user are right so now we can generate auth token or add a cookie inside browser. 
        
    } catch (error) {
        next(error)   
    }
}

