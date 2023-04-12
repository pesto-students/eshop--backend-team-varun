const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getTopDeals,
  getShuffleProducts,
  getTopMonthDeals,
} = require("../controllers/productController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(verifyToken, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(verifyToken, authorizeRoles("admin"), updateProduct)
  .delete(verifyToken, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetail);

router.route("/product/:id").get(getProductDetail);

router.route("/review").put(verifyToken, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(verifyToken, deleteReviews);

router.route("/topdeals").get(getTopDeals);
router.route("/shuffleproducts").get(getShuffleProducts);
router.route("/monthlytopdeals").get(getTopMonthDeals);

module.exports = router;
