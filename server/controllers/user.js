import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const postSignup = async(req,res)=>{
    const {name, email,phone, adress, password, rePassword} = req.body;

    if(!password){
        return res.status(400).json({
            success:false,
            message:"Password is required"
            }); 
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
            message:"Name is required"
            }); 
    }

    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is required"
            }); 
    }

    if(!phone){
        return res.status(400).json({
            success:false,
            message:"Phone is required"
            }); 
    }

    if(!adress){
        return res.status(400).json({
            success:false,
            message:"Adress is required"
            }); 
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
        message:"signup succesfull",
        data:{
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            adress: savedUser.adress, 
        }
    });

} catch (error){
    return res.status(400).json({
        success:false,
        message:error.message
        }); 
}};



const postLogin = async (req , res) => {
    const {email , password}= req.body ;

    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is required"
            }); 
    }

    if(!password){
        return res.status(400).json({
            success:false,
            message:"Password is required"
            }); 
    }

    const user = await User.findOne({ email });
    
    if(!user){
        return res.status(400).json({
            success:false,
            message:"please signup first before loging in "
            });
         }

         const passwordMatch = bcrypt.compareSync(password , user.password)

     if(passwordMatch){

        const jwtToken = jwt.sign({email: user.email , role:user.role},process.env.JWT_SECRET);
        res.setHeader("Authorization",`Bearer ${jwtToken}`)

         return res.json({
            success:true,
            token:jwtToken,
             message:"Loging succesfull"
             }); 
            }

            else{
                return res.status(400).json({
                    success:false,
                    message:"invalid candidet"
                    }); }

 }

export{postSignup , postLogin}