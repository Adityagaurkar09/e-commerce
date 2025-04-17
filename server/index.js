import express, { response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
dotenv.config();

import {postSubmit, getUsers} from './controllers/user.js'


const app = express();
app.use(express.json());
app.use(cors(
    {
        origin : "http://localhost:3000",
        credentials : true,
    }
));

//conect to mongodb

const conectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn){
        console.log("mongoose conectd succesfull")
    }
};
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    });
});

app.post("/submit",postSubmit);
app.get("/users", getUsers);

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});



const PORT = process.env.PORT || 5003;

app.listen(PORT,()=>{
    console.log (`server is connected ${PORT}`)
    conectDB();
})
