
import User from '../models/User.js'

const postSubmit = async(req,res)=>{
    const {name, email,phone, address} = req.body;

    if(!name){
        return res.status(400).json({
            success:false,
            message:"name is required"
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

    if(!address){
        return res.status(400).json({
            success:false,
            message:"address is required"
            }); 
    }

    
    try{     
        //etna data store krenge
    const newUser =new User({      
        name,
        email,
        phone,
        address,
    })

    const savedUser = await newUser.save();

    return res.json({
        success:true,
        message:"Submit succesfull",
         //etna hi data user ko dikaenge
        data:{ 
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            address: savedUser.address, 
        }
    });

} catch (error){

    if(error.message.includes("duplicate key error")){
        return res.status(400).json({
        success:false,
        message:`${Object.keys(error.keyValue)} ${Object.values(error.keyValue)} already exist`}); 
    }
        return res.status(400).json({
        success:false,
        message:error.message
        }); 
}};

// const getUsers = async (req, res) => {
  
//     const users = await User.find(); // database se data lenga 
//     res.status(200).json({
//       success: true,
//       data: users,
//       message: "Users fetched successfully",
//     });
  
//   }


const getUsers = async (req, res) => {
  try {
    const users = await User.find();  
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};




export{postSubmit, getUsers }