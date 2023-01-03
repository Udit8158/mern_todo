import express from "express";
import { body } from "express-validator";
import logIn from "../controllers/logIn.js";
import logOut from "../controllers/logOut.js";
import refreshToken from "../controllers/refreshToken.js";
import register from "../controllers/register.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const authRoute = express();

// Sign Up
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

// Sign In
authRoute
  .route("/login")
  .post(
    [body("email").isEmail(), body("password").isLength({ min: 6 })],
    logIn
  );

// Refresh ref token
authRoute.route("/refresh").get(refreshToken);

// Logout
authRoute.route("/logout").get(verifyAccessToken, logOut);

export default authRoute;
