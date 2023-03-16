import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create A Product
router.post("/addProduct/new", createProduct);

// Get Product Details
router.get("/:id", getProductDetails);

// Get All Products
router.get("/", getAllProducts);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;
