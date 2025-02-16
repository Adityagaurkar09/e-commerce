// const errorMandataryField = (res,field)=>{
//     return res.status(400).json({success:false , message:`${field} is required`});
// }


import Product from '../models/Products.js'
import { responder } from '../utils/utils.js';

const postProducts = async(req,res)=>{
    const {name , shortDescription,longDescription,price,currentPrice,category,images,tags} = req.body;

    const mandataryField = ["name","shortDescription","longDescription","price","category","images"]

    // if (!name){
    //     return errorMandataryField(res,"name");
    // }

for(const field of mandataryField){
    if(!req.body[field]){
        return responder (res, false, `${field} is required`, 400)
    }}

const newProduct = new Product ({
    name , shortDescription,longDescription,price,currentPrice,category,images,tags
});

try{
    const savedProduct = await newProduct.save();
    return responder (res, true , "products created succesfully" , savedProduct)
}
catch(error){
    return responder (res, false , error.message , 400)
}};

const getProduct = async(req,res) => {
    const {limit,search} = req.query;

    const product = await Product.find({
        name : {
            $regex : new RegExp(search||""),
            $options: "i"  
           }}
    ).limit(parseInt (limit || 100))

    // res.json({
    //     success:true,
    //     message:"product fetch succesfully",
    //     data : product,
    //     return responder (res, true , "products fetch succesfully" , product)
    // })

    return responder (res, true , "products fetch succesfully" , product)
};
export {postProducts , getProduct};



