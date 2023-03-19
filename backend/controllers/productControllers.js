const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");




//create Product -- Admin access only 
exports.createProduct=  catchAsyncError(   async(req , res, next)=>{

     
    const product =await  Product.create(req.body);
    res.status(201).json({
    success:true,
    product
});
});





//Get All Product

exports.getAllProducts = catchAsyncError(  async(req, res)=>{

     const products = await Product.find()
    const productCount= await Product.countDocuments();

    res.status(200).json({
        success:true,
        products,
        productCount,
    });
});

//Get Product details 
exports.getProductDetail= catchAsyncError(  async(req, res , next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }

   
    res.status(200).json({
        success:true,
       product,
       
    }); 
});

// Update Product  -- admin only 

exports.updateProduct = catchAsyncError(  async(req, res , next)=>{
    let product = await Product.findById(req.params.id,req.body);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }
    
product =await Product.findByIdAndUpdate(req.params.id, req.body,{
    new:true   ,
    runValidators:true,
    useFindAndModify:false
});
res.status(200).json({
    success:true,
    product
});

});

// Delete Product -- admin only 

exports.deleteProduct= catchAsyncError (  async(req, res , next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfuly"
    });
});