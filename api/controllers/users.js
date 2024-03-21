import User from "../Models/User.js";
import CryptoJS from "crypto-js";
import createError from "../utils/createError.js";

// DELETE USER
export const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "you can delete only your account!"));
  }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "you can update only your account!"));
  }
};

// GET ALL USER

export const getAllUser = async (req, res, next) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "you can't get users!"));
  }
};

// GET USER STATS

export const getUserStats = async (req, res, next) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
