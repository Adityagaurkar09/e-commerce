import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { responder } from '../utils/utils.js';

const postSignup = async(req,res)=>{
    const {name, email,phone, adress, password, rePassword} = req.body;

    if(!password){
        return res.status(400).json({
            success:false,
            message:"Password is required done"
            }); 
        // return responder (res, false , "Password is required" , 400)
    }

    if(password!==rePassword){
        return res.status(400).json({
        success:false,
        message:"Pasword does not match"
        }); 
    }
     
    if(!name){
        return res.status(400).json({
            success:false,
            message:"name is required"
            }); 
        // return responder (res, false , "Name is required" , 400)
    }

    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is required"
            }); 
        // return responder (res, false , "Email is required" , 400)
    }

    if(!phone){
        return res.status(400).json({
            success:false,
            message:"Phone is required"
            }); 
        // return responder (res, false , "Phone is required" , 400)
    }

    if(!adress){
        return res.status(400).json({
            success:false,
            message:"Adress is required"
            }); 
        // return responder (res, false , "Adress is required" , 400)
    }

     const salt = bcrypt.genSaltSync(10)
    
    try{
    const newUser =new User({
        name,
        email,
        phone,
        adress,
        password:bcrypt.hashSync(password,salt)
    })

    const savedUser = await newUser.save();

    return res.json({
        success:true,
        message:"signup succesfull , Please login",
        data:{
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            adress: savedUser.adress, 
        }
    });

} catch (error){

    if(error.message.includes("duplicate key error")){
        return res.status(400).json({
        success:false,
        message:`${Object.keys(error.keyValue)} ${Object.values(error.keyValue)} already exist`}); 
        // return responder (res, false , `${Object.keys(error.keyValue)} ${Object.values(error.keyValue)} already exist` , 400)
    }
        return res.status(400).json({
        success:false,
        message:error.message
        }); 
    // return responder (res, false , error.message , 400)
}};



const postLogin = async (req , res) => {
    const {email , password}= req.body ;

    if(!email){
        // return res.status(400).json({
        //     success:false,
        //     message:"Email is required"
        //     }); 
        return responder (res, false , "Email is required" , 400)
    }

    if(!password){
        // return res.status(400).json({
        //     success:false,
        //     message:"Password is required"
        //     }); 
        return responder (res, false , "Password is required" , 400)
    }

    const user = await User.findOne({ email });
    
    if(!user){
        // return res.status(400).json({
        //     success:false,
        //     message:"please signup first before loging in "
        //     });
         return responder (res, false , "please signup first before loging in " , 400)
         }

         const passwordMatch = bcrypt.compareSync(password , user.password)
         const userDetail = {email: user.email ,
             role:user.role ,
              _id:user._id,
               name:user.name}

     if(passwordMatch){

        const jwtToken = jwt.sign(userDetail,process.env.JWT_SECRET);
        res.setHeader("Authorization",`Bearer ${jwtToken}`)

        req.session.jwtToken = jwtToken;

         return res.json({
            success:true,
            token:jwtToken,
            data:userDetail,
             message:"Loging succesfull"
             }); 
            }
             else{
                return responder (res, false, "invalid candidet", 400) }
 }

export{postSignup , postLogin}