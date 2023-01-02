import { body } from "express-validator";

const validateUser = (req, res, next) => {
  // email must be an email
  body("email").isEmail(),
    // password must be at least 6chars long
    body("password").isLength({ min: 6 }),
    next();
};

export default validateUser;
