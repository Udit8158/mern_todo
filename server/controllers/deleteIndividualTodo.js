import TodoSchema from "../schemas/TodoSchema.js";

const deleteIndividualTodo = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Do some checks on the todo
    const todo = await TodoSchema.findById(id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });
    if (todo.author !== user.email)
      return res.status(403).json({ msg: "Forbidden" });

    // Delete the todo
    await TodoSchema.findByIdAndDelete(id);
    res.json({ msg: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export default deleteIndividualTodo;
