const Product= require("../models/productModel");





//create Product -- Admin access only 
exports.createProduct=   async(req , res, next)=>{
     
    const product =await  Product.create(req.body);
    res.status(201).json({
    success:true,
    product
});
};






//Get All Product

exports.getAllProducts =   async(req, res)=>{
    const product = await Product.find();
   
    res.status(200).json({
        success:true,
        product,
     
    });
};

//Get Product details 
exports.getProductDetail= async(req, res , next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product Not Found",
        });    
    };

   
    res.status(200).json({
        success:true,
       product,
       
    }); 
};

// Update Product  -- admin only 

exports.updateProduct = async(req, res , next)=>{
    let product = await Product.findById(req.params.id, req.body);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product Not Found",
        });    
    };
    
product =await Product.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
});
res.status(200).json({
    success:true,
    product
});

};

// Delete Product -- admin only 

exports.deleteProduct= async(req, res , next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product Not Found",
        });    
    }

      await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfuly",
    });
};