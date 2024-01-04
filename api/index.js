import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './Routes/user.route.js'
import authRouter from './Routes/auth.route.js'
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log(err)
})


const app = express()


// by default we are not allowed to send json as a input so we use this 
app.use(express.json())


app.listen(3000,()=>{
    console.log("server is running at port 3000!!")
})

// api routes
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


// creating middleware
//err is the input which is coming from the sent to middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
    })
})