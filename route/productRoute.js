import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// Create A Product
router.post(
  "/addProduct/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

// Get All Products
router.get("/", getAllProducts);

// Get Product Details
router.get("/:id", getProductDetails);

// Update Product
router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Delete Product
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
