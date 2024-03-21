import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import moviesRouter from "./routes/movies.js";
import listsRouter from "./routes/lists.js";

const app = express();
dotenv.config();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("database is connected");
    });
  } catch (error) {
    console.log("Database is not connect!");
  }
};

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/lists", listsRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use("/", (req, res) => {
  res.status(200).json("Hello world");
});

app.listen(5000, () => {
  connect();
  console.log("Server is running!");
});
