import { validationResult } from "express-validator";
import TodoSchema from "../schemas/TodoSchema.js";

const createTodo = async (req, res) => {
  // check if the usr in the request
  const user = req.user;
  if (!user) return res.status(403).json({ message: "Forbidden" });

  // checking validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const title = req.body.title;

  // Create new todo
  const newTodo = new TodoSchema({ title, author: user.email });
  await newTodo.save();

  res.status(201).json(newTodo);
};

export default createTodo;
