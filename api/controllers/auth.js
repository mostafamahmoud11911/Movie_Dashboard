import User from "../Models/User.js";
import CryptoJS from "crypto-js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.status(200).json({...info, token});
  } catch (error) {
    next(error);
  }
};
