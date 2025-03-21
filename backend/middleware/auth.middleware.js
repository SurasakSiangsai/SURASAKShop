import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			console.log("No access token provided");
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				console.log("User not found");
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;
			console.log("Authenticated user:", user);
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				console.log("Access token expired");
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};

export const isSellerOrAdmin = (req, res, next) => {
	if (req.user.role === "seller" || req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Access denied. Only sellers or admins can perform this action." });
	}
};
