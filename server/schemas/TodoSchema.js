import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
      immutable: true,
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("Todo", TodoSchema);
