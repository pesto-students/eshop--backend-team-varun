const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/featuresApi");
const cloudinary = require("cloudinary").v2;

//create Product -- Admin access only
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 12;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//Get Product details
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product  -- admin only
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  // console.log("body", req.body);
  let product = await Product.findById(req.params.id);
  console.log("product => ", product);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- admin only

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Delete Images from Cloudinary
  for (let i = 0; i < images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfuly",
  });
});

//Create New  Review or update  the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, name, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment), (rev.name = name);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.rating = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All reviews of a Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete  Reviews

exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//  Top Deals --
exports.getTopDeals = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 20;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).pagination(
    resultPerPage
  );
  const productsArray = await apiFeature.query;

  if (!productsArray) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const products = [];
  productsArray.forEach((product) => {
    if (product.featured === "True") {
      products.push(product);
    }
  });

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Suffled Products
function shuffle(pro) {
  for (let i = pro.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [pro[i], pro[j]] = [pro[j], pro[i]];
  }
}

exports.getShuffleProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  const productCount = await Product.countDocuments();

  const product = [];

  Object.keys(products).forEach((key) => {
    product.push(products[key]);
  });
  shuffle(product);

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// Top Deals of Month
exports.getTopMonthDeals = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 20;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).pagination(
    resultPerPage
  );
  const productsArray = await apiFeature.query;

  if (!productsArray) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const products = [];
  productsArray.forEach((product) => {
    if (product.rating >= 4) {
      products.push(product);
    }
  });

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});
