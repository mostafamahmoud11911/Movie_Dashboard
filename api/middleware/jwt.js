import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const auth = req.headers.token;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = payload;
      next();
    });
  } else {
    return next(createError(401, "You are not authenticated!"));
  }
};
