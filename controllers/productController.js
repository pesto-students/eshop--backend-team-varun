import Product from "../models/productModel.js";

// Create Product --Admin
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      savedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// Get Product Details
export const getProductDetails = async (req, res, next) => {
  if ((await Product.findById(req.params.id)) === null) {
    return res.status(500).json({
      success: false,
      statusCode: 404,
      message: "Product not found",
    });
  }

  try {
    const productDetails = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      productDetails,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Products using filter
// export const getHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 100000 },
//     }).limit(req.query.limit);
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

// Update Product --Admin
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Product --Admin
export const deleteProduct = async (req, res, next) => {
  if ((await Product.findById(req.params.id)) === null) {
    return res.status(500).json({
      success: false,
      statusCode: 404,
      message: "Product not found",
    });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (err) {
    next(err);
  }
};