import {model,Schema} from 'mongoose'
import product from './Products';

const orderSchema = new Schema ({
    userId:{  
        types:Schema.types.ObjectId,
        ref:"user",
        required:true,
    },
    products:[
        {
            productId :{
                types:Schema.types.ObjectId,
                ref:"user",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },}],
            totalBill:{
                type:Number,
                required:true,
            },
            delivaryAdress:{
                type:String,
                required:true,
             },
             phone:{
                type:string,
                required:true,
             },
             paymentMethod:{
                type:string,
                required:true,
             },
             paymentId:{
                type:Schema.type.ObjectId,
                ref:"payment",
                required:true,
             },
             timeLine:[{
             status:{
                type:string,
                required:true,
             },
             date:{
                type:Date,
                default:Date.now
             },
            },
         ],
        },
{
    timestamps:true,
})




const Order = model ("order",orderSchema);

export default Order;