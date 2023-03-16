import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Get All Products
router.get("/", getAllProducts);

export default router;
