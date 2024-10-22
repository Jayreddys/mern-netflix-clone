import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("netflix_clone", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: ENV_VARS.NODE_ENV !== "development",
    sameSite: "strict",
  });
  return token;
};

export default generateTokenAndCookie;
