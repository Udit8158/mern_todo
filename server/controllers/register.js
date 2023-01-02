import { validationResult } from "express-validator";

const register = (req, res) => {
  const { name, email, password } = req.body;

  // Check every filds are in the body or not
  if (!name || !email || !password)
    return res.status(400).json({ message: "Every filds are required" });

  res.json(req.body);
};

export default register;
