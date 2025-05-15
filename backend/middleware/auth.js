import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;

  // Check token in Authorization header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log("No token found in Authorization header or cookies.");
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, please log in" });
  }

  console.log("Token received:", token);  // Log token to check it

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);  // Log decoded token for debugging

    // Attach user info to request object in a consistent format
    req.user = { id: decoded.id };

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;



