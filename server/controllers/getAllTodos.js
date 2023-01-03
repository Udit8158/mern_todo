import TodoSchema from "../schemas/TodoSchema.js";

const getAllTodos = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(403).json({ msg: "Forbidden" });

  const todos = await TodoSchema.find({ author: user.email });
  res.json(todos);
};

export default getAllTodos;
