import { validationResult } from "express-validator";
import UserSchema from "../schemas/UserSchema.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // checking validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check every filds are in the body or not
  // if (!name || !email || !password)
  //   return res.status(400).json({ message: "Every filds are required" });

  // check for duplicate inside DB
  const duplicate = await UserSchema.findOne({ email: email });
  if (duplicate)
    return res.status(400).json({ message: "User already exists" });

  // Now save new user to database
  const user = new UserSchema({ name, email, password });
  await user.save();

  res.json(user);
};

export default register;
