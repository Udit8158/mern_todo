import TodoSchema from "../schemas/TodoSchema.js";

const updateIndividualTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const user = req.user;

  try {
    // Find that todo
    const todo = await TodoSchema.findById(id);

    // Do some checking
    if (!todo) return res.status(404).json({ msg: "Not Found" });
    if (todo.author !== user.email)
      return res.status(403).json({ message: "Forbidden" });

    // Update the todo accordingly
    if (title) await TodoSchema.findByIdAndUpdate(id, { title });
    if (completed) await TodoSchema.findByIdAndUpdate(id, { completed });

    res.json({ msg: "Successfully updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export default updateIndividualTodo;
