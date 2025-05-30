import express, { response } from 'express'
import nodemon from 'nodemon'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session'
dotenv.config();

import {postSignup, postLogin} from './controllers/user.js'
import {postProducts,getProduct} from './controllers/products.js';
import {jwtMiddleware,checkRollMiddleware} from './middleware/auth.js'
import {postOrder ,putOrder ,getOrderById ,getOrderByUserId} from './controllers/order.js'
import {postPayments} from './controllers/payment.js'

import { responder} from '../server/utils/utils.js'


const app = express();
app.use(express.json());
app.use(cors(
    {
        origin : "http://localhost:3000",
        credentials : true,
    }
));
app.use(session({ 
secret : "test secret", 
resave: false, 
saveUninitialized: false,
cookie : {maxAge: 1000 * 60 * 60 ,  httpOnly : false , secure : false} }))


//conect to mongodb

const conectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn){
        console.log("mongoose conectd succesfull")
    }
};
app.get("/health",jwtMiddleware , (req,res)=>{
    // res.json({
    //     success:true,
    //     message:"server is runing"
    // req.session.user = {id : "1234" , name : "test"}
    return responder (res,true,"server is runing")
    })

//auth
app.post("/signup",postSignup);
app.post("/login",postLogin);

//product
app.post("/product",jwtMiddleware,checkRollMiddleware,postProducts);
app.get("/product", getProduct);

//order api
app.post("/order",jwtMiddleware,postOrder);
app.put("/order/:id",jwtMiddleware,putOrder);
app.get("/order/:id",jwtMiddleware,getOrderById);
app.get("/order/user/:id",jwtMiddleware,getOrderByUserId);

//payment api
app.post("/payments",postPayments);


// app.post("/order",jwtMiddleware,(req,res)=>{
//     res.json({
//         success:true,
//         message:"order placed successfully",
//     });
// });



app.use("*/",(req,res)=>{
    // res.status(404).json({
    //     success:false,
    //     message:"rout not Found"
    return responder(res,false,"rout not Found",null,404,)
    })


const PORT = process.env.PORT || 5003;

app.listen(PORT,()=>{
    console.log (`server is connected ${PORT}`)
    conectDB();
})
