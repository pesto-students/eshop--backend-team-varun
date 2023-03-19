 const express = require("express");
  const {getAllProducts, 
    createProduct,
    updateProduct ,
    deleteProduct, 
    getProductDetail,
    createProductReview}= require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


   const router = express.Router();


    router.route("/products").get( getAllProducts);


    router.route("/admin/product/new").post( isAuthenticatedUser, authorizeRoles("admin"),createProduct);

    
    router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
    .get(getProductDetail);

    router.route("/product/:id").get(getProductDetail);

    router.route("/review").put(isAuthenticatedUser , createProductReview);

    



    module.exports = router;