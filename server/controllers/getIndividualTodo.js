import TodoSchema from "../schemas/TodoSchema.js";

const getIndividualTodo = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Find the todo
    const todo = await TodoSchema.findById(id);

    // Do some checking
    if (!todo) return res.status(404).json({ message: "No such todo found" });
    if (todo.author !== user.email)
      return res.status(403).json({ message: "Forbidden" });

    // Return the results
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getIndividualTodo;
