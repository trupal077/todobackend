const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo_name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
