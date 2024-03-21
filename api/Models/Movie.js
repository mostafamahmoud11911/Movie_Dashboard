import mongoose from "mongoose";

const { Schema } = mongoose;

const MovieSchema = new Schema(
    {
      title: { type: String, required: true, unique: true },
      desc: { type: String },
      img: { type: String },
      video: { type: String },
      year: { type: String },
      duration: { type: String },
      limit: { type: String },
      genre: { type: String },
      isSeries: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  export default mongoose.model("Movie", MovieSchema);