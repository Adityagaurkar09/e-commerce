import Order from '../models/Order.js'
import mongoose from 'mongoose';

const postOrder = async (req,res)=>{
const {
    products,
    delivaryAdress,
    phone,
    paymentMethod
} = req.body;

    if(!products || !delivaryAdress || !phone || !paymentMethod){
        return res.json({
            success:false,
            message:"products,totalBill,delivaryAdress,phone,paymentMethod All field Required"
        })
    }

    let totalBill = 0 ; 

    products.forEach((product)=>{
        totalBill += product.price * product.quantity;
    })

    try {
    const newOrder = new Order ({
        userId : req.user._id,
        products,
        totalBill,
        delivaryAdress,
        phone,
        paymentMethod,
    })

    const saveOrder = await newOrder.save();

return res.json({
    success:true,
    message:"Order Placed successfully",
    data:saveOrder
})}
catch(error){
return res.status(400).json({success:false , message:error.message})
}}

const putOrder = async (req,res)=>{
    const user = req.user;
    console.log(user)


    const {id} = req.params;
    // console.log(id)
    let order ; 

    try{
   order = await Order.findById(id);
    if(!order){
        return res.status(404).json({
        success:false,
        message:"order not found"
      })
      }}
      catch(error){
        return res.status(400).json({success:false , message:error.message})
      }

      if(user.role == "user" && order.userId!==user._id){ 
        return res.status(401).json({
            success:false,
            message:"Your not authorized this order"
          })
      }

      if(user.role == "user"){
        if(order.status!= "delivered" ){
            return res.status(400).json({
                success:false,
                message:"order has been allready deliverd"
            });
        }
        if(req.body.phone){
            order.phone = req.body.phone;
        }
        if(req.body.delivaryAdress){
            order.delivaryAdress = req.body.delivaryAdress;
        }
        if(req.body.status == "cancelled"){
         order.status = "cancelled";
      }}

      if(user.role == "admin" ){
        order.status = req.body.status;
        order.timeLine = req.body.timeLine;
      }
      await order.save();
      
      const updateOrder = await Order.findById(id);

    return res.json({
        success:true,
        message:"Order updated successfully",
        data:updateOrder
    })
}

const getOrderById = async (req,res)=>{
    const user = req.user;
    console.log(user)
    const {id} = req.params;

    let order;
    try{
        order = await Order.findById(id).populate("userId","name email").populate("products.productId","-shortDescription -longDescription -images  -createdAt -updatedAt  -tags -__v").populate("paymentId"," -createdAt -updatedAt -__v");
    if(!order){
        return res.status(404).json({
            success:false,
            message:"order not found"
        })
    }}
    catch(error){
        return res.status(400).json({success:false , message:error.message});
    }

    if(user._id!=order.userId && user.role!="admin"){
        return res.status(401).json({
            success:false,
            message:"Your not authorized view this order"
        })
    }
    return res.json({
        success:true,
        message:"order fetch successfully",
        data:order,
    })
}

const getOrderByUserId = async (req , res) => {
    const user = req.user;
    const {id} =req.params;



    if(user._id!=id && user.role!="admin"){
        return res.status(400).json({
            success:false,
            message:"Your not authorized view this order"
        })
    }

    const order = await Order.find ({userId:id }).populate("userId","name email").populate("products.productId","-shortDescription -longDescription -images  -createdAt -updatedAt  -tags -__v").populate("paymentId"," -createdAt -updatedAt -__v");

    return res.json({
        success:true,
        message:"order fetch successfully",
        data:order,
    })
}


export{postOrder , putOrder ,getOrderById ,getOrderByUserId};





// {
//     "status":"cancelled",
//     "timeLine":[
//         {
//             "status":"order received",
//             "date":"2024/12/20"
//         }
//     ]
// }

// {
//     "products":[
//         {
//             "productId":"67681a7f2f312a582f218212",
//             "quantity":"30",
//             "price":30
//         }
//     ],
//     "totalBill":"240",
//      "delivaryAdress":"pune",
//      "phone":"8010825030",
//      "paymentMethod":"cash on delivary"

// }