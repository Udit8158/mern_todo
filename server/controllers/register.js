import { validationResult } from "express-validator";
import UserSchema from "../schemas/UserSchema.js";
import { generateAccessToken, generateRefreshToken } from "./JWT.js";
import { hash } from "bcrypt";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // checking validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check for duplicate inside DB
  const duplicate = await UserSchema.findOne({ email: email });
  if (duplicate)
    return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Now save new user to database
  const user = new UserSchema({ name, email, password: hashedPassword });
  await user.save();

  // Genreating tokens as sign in
  const accessToken = generateAccessToken({ name, email });
  const refreshToken = generateRefreshToken({ name, email });

  res
    .status(200)
    .cookie("refreshToken", refreshToken, { httpOnly: true })
    .json({ accessToken });
};

export default register;
