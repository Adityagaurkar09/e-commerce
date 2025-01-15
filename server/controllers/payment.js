import { responder } from '../utils/utils.js';
import Order from './../models/Order.js';
import Payment from './../models/Payment.js';
 
 const postPayments = async (req , res) => {
    const { orderId,amount,transitionId, status,paymentMethod } = req.body;

       let order;
    try{
       order = await Order.findById(orderId);
    }
    catch(error){
        return responder (res,false,error.message,400)
        
    }

       if(!order){
        return responder (res, false, "order not does not exist", 400)
       }

       if(order.status.toLowerCase() =="delivered" || order.status.toLowerCase() =="cancelled"){
        return responder (res, false, `order already ${order.status}`,400)
       }

       const payment = new Payment ({
        paymentMethod,
        amount,
        transitionId,
        status,
       })
       try{
       const savePayment = await payment.save();

       order.paymentId = savePayment._id;
       order.paymentMethod = paymentMethod;

       order.timeLine.push({status:"payment completed", data:Date.now()});

       await order.save();

    //    return res.json({
    //     success:true,
    //     message:"payment completed successfully",
    //     data:savePayment
    //    })
    return responder(res,true,"payment completed successfully",savePayment)

       } catch(error){return res.status(400).json({success:false, nessage:error.message})}
 };

 export {postPayments};