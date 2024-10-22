import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["netflix_clone"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId, { password: 0 });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in middleWare: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
