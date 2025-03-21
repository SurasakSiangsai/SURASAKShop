import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute, isSellerOrAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, isSellerOrAdmin, getAllProducts); // Allow sellers to fetch their own products
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, isSellerOrAdmin, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct); // Only admins can toggle featured
router.delete("/:id", protectRoute, isSellerOrAdmin, deleteProduct); // Admins and sellers can delete products

export default router;
