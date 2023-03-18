import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";

// Create Product --Admin
export const createProduct = async (req, res, next) => {
  req.body.user = req.user.id;
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
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  try {
    const products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productsCount,
    });
  } catch (err) {
    next(err);
  }
};

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
