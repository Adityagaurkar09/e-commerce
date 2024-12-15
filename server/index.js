import express from 'express'
import nodemon from 'nodemon'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config();

const app = express();
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

app.use("*/",(req,res)=>{
    res.status(404).json({
        success:false,
        message:"rout not Found"
    })
})

const PORT = process.env.PORT || 5002;

app.listen(PORT,()=>{
    console.log (`server is connected ${PORT}`)
    
})