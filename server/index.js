import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import todoRoute from "./routes/todo.js";

// some usefull things
dotenv.config(); // using dotenv
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/todos", todoRoute);
// DB connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// open server
app.listen(PORT, () => console.log("listening on port", PORT));
