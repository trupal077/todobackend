const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to verify token and get the user ID
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Token is usually "Bearer <token>"
    req.user = await User.findById(decoded.id); // Attach user data to the request object
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
