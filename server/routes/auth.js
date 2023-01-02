import express from "express";
import register from "../controllers/register.js";
import validateUser from "../middlewares/validateUserInput.js";

const authRoute = express();

authRoute.route("/register").post(validateUser, register);

export default authRoute;
