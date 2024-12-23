import Order from '../models/Order.js'

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
        paymentMethod
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

export{postOrder};
