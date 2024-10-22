import { User } from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.lenth < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password is too short" });
    }

    const checkUserByUsername = await User.findOne({ username: username });
    if (checkUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "UserName Already Taken" });
    }

    const checkUserByEmail = await User.findOne({ email: email });
    if (checkUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email has been already Registered" });
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    generateTokenAndCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }

    const userbyEmail = await User.findOne({ email: email });
    if (!userbyEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Credentials" });
    }
    const checkPassword = await bcryptjs.compare(
      password,
      userbyEmail.password
    );
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Credentials" });
    }
    generateTokenAndCookie(userbyEmail._id, res);
    res.status(201).json({
      success: true,
      user: {
        ...userbyEmail._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("netflix_clone");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error in AuthChecker: ", error.message);
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}
