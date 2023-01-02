import express from "express";
import { body } from "express-validator";
import register from "../controllers/register.js";

const authRoute = express();

authRoute
  .route("/register")
  .post(
    [
      body("name").exists(),
      body("email").isEmail(),
      body("password").isLength({ min: 6 }),
    ],
    register
  );

export default authRoute;
