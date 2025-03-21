import express from "express";
import { createProduct, deleteProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isSellerOrAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, isSellerOrAdmin, createProduct); // Sellers can create their own products
router.delete("/:id", protectRoute, isSellerOrAdmin, deleteProduct); // Sellers can delete their own products

export default router;