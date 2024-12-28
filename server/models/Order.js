import {model,Schema} from 'mongoose'


const orderSchema = new Schema ({
    userId:{  
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[
        {
            productId :{
                type:Schema.Types.ObjectId,
                ref:"Product",
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
                type:String,
                required:true,
             },
             paymentMethod:{
                type:String,
                required:true,
             },
             paymentId:{
                type:Schema.Types.ObjectId,
                ref:"Payment",
             },
             status:{
                type:String,
                default:"pending",
             },
             timeLine:[{
             status:{
                type:String,
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




const Order = model("Order",orderSchema);

export default Order;