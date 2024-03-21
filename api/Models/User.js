import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      required: true,

    },
    phone: {
      type: String,
      required: true,

    },
    password: {
      type: String,
      required: true,
    },
    imgProfile: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
