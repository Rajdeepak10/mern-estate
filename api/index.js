import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './Routes/user.route.js'
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log(err)
})


const app = express()

app.listen(3000,()=>{
    console.log("server is running at port 3000!!")
})

// api routes
app.use('/api/user',userRouter)