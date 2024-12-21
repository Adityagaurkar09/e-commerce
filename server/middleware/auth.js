 import jwt from 'jsonwebtoken';

//jwt middleware use for login reqired //

const jwtMiddleware = async(req,res,next)=>{
    const jwtToken = req.headers.authorization.split(" ")[1];

    if(!jwtToken){
        return res.status(401).json({
        success:false,
         message:"jwt token is missing"
       }); 
    }
    try{
       const decoded = await jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch(error){
        return res.status(401).json({
         success:false,
       message:"invalid jwt token"
      }); 
    }
};

export {jwtMiddleware}