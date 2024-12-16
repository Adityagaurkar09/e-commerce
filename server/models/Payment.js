import { model , Schema } from "mongoose";

const paymentSchema = new Schema ({
    paymentMode:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    transitionId:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
},{
    timestamps:true
})

const Payment = model ("payment" ,paymentSchema )

export default Payment;