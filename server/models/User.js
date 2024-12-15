import { model, Model,Schema } from "mongoose";

const userSchema = new Schema ({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        unique:true,
    },
    phone: {
        type:String,
        unique:true,
    },
    adress: {
        type:String,
    },
    role: {
        type:String,
        default:'user',
    },
});

const user = model('user', userSchema);

export default user;