import { model,Schema } from "mongoose";

const productSchema = new Schema ({
    name: {
     type:String,
    required:true
},
shortDescription:{
    type: String,
    required:true,
},
longDescription:{
    type: String,
    required:true,
},
price:{
    type: Number,
    required:true,
},
currentPrice:{
    type: Number,
},
category:{
    type: String,
    required:true,
},
images:{
    type: [String],
    required:true,
},
tags:{
    type: [String],
}
},
{
    timestamps:true,
});

const Product = model ("Product",productSchema);

export default Product;

// const product = {
//     name : "Lenovo IdeaPad 1 AMD Athlon Dual Core 7120U ",
//    shortDescription:"Lenovo IdeaPad 1 AMD Athlon Dual Core 7120U - (8 GB/512 GB SSD/Windows 11 Home) 15AMN7 Thin and Light Laptop  (15.6 inch, Cloud Grey, 1.58 Kg, With MS Office)",
//     longDescription:"The IdeaPad Slim 1 was designed to be used on the go for those who like learning all the time and hence it is only 19.9 mm thin and weighs only 1.65 kg, now you can learn wherever you want and whenever you want.",
//     "price":23690,
//     "category" : "Laptop",
//     "images": [
//         "https://p2-ofp.static.pub/fes/cms/2022/09/26/i6zlcap44kafmcywlh54d9rd1wieh1215035.png",
//         "https://p3-ofp.static.pub/fes/cms/2022/09/26/hif2cnxhohr2dh3dwgg1trg70pip4y581012.png",
//         "https://p1-ofp.static.pub/fes/cms/2022/09/26/kcylxfkz0zeigek6ravcjns4a5cqg3409627.png",
//         "https://p2-ofp.static.pub/fes/cms/2022/09/26/6vqcmbpcfs5fddq9vxtf7mlo3064tj549746.png"
//     ],
//     tags:["best offer ", "New arriwal", "best seller"]

// };