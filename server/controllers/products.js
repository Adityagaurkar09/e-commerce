// const errorMandataryField = (res,field)=>{
//     return res.status(400).json({success:false , message:`${field} is required`});
// }


import Product from '../models/Products.js'

const postProducts = async(req,res)=>{
    const {name , shortDescription,longDescription,price,currentPrice,category,images,tags} = req.body;

    const mandataryField = ["name","shortDescription","longDescription","price","category","images"]

    // if (!name){
    //     return errorMandataryField(res,"name");
    // }

for(const field of mandataryField){
    if(!req.body[field]){
        return res.status(400).json({success:false , message:`${field} is required`});
    }
}

const newProduct = new Product ({
    name , shortDescription,longDescription,price,currentPrice,category,images,tags
});

try{
    const savedProduct = await newProduct.save();
    return res.json({
        success:true,
        message:"products created succesfully",
        data:savedProduct
    })
}
catch(error){
    return res(400).json({
        success:false,
        message:error.message
    })
}
   
};

const getProduct = async(req,res) => {
    const {limit,search} = req.query;

    const product = await Product.find({
        name : {
            $regex : new RegExp(search||""),
            $options: "i"  
           }
    }
    ).limit(parseInt (limit || 100))

    res.json({
        success:false,
        message:"product fetch succesfully",
        data : product,
    })

}

export {postProducts , getProduct};
