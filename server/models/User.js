import { model,Schema } from "mongoose";

// created new user schema
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
    address: {
        type:String,
    },
});

const User = model('User', userSchema);

export default User;