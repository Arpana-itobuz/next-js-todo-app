import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;
