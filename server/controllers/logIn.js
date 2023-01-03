import UserSchema from "../schemas/UserSchema.js";
import { compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "./JWT.js";
import { validationResult } from "express-validator";

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  // checking validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Found the user in DB
  const user = await UserSchema.findOne({ email });

  if (!user) return res.status(404).send({ msg: "Credentials mismatch" });

  // Check if the user's password matches
  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch)
    return res.status(401).send({ msg: "Credentials mismatch" });

  // Generate tokens
  const accessToken = generateAccessToken({
    name: user.name,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({
    name: user.name,
    email: user.email,
  });

  // Send tokens
  res
    .status(200)
    .cookie("refreshToken", refreshToken, { httpOnly: true })
    .json({
      name: user.name,
      email,
      accessToken,
    });
};

export default logIn;
