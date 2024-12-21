import express, { response } from 'express'
import nodemon from 'nodemon'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
dotenv.config();

import {postSignup, postLogin} from './controllers/user.js'
// import {jwtMiddleware} from './middleware/auth.js'

const app = express();
app.use(express.json());
app.use(cors());


//conect to mongodb

const conectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn){
        console.log("mongoose conectd succesfull")
    }
};
app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"server is runing"
    })
})

//auth
app.post("/signup",postSignup);
app.post("/login",postLogin);

//product


// app.post("/order",jwtMiddleware,(req,res)=>{
//     res.json({
//         success:true,
//         message:"order placed successfully",
//     });
// });



app.use("*/",(req,res)=>{
    res.status(404).json({
        success:false,
        message:"rout not Found"
    })
})

const PORT = process.env.PORT || 5002;

app.listen(PORT,()=>{
    console.log (`server is connected ${PORT}`)
    conectDB();
})
