const Todo = require("../model/todo.model");

const AddTodo = async (req, res) => {
  try {
    const { todo_name, completed } = req.body;

    if (!todo_name) {
      return res.status(400).json({ message: "Todo name is required" });
    }

    const newTodo = new Todo({
      todo_name,
      completed: completed || false,
      user: req.user._id, // Associate the todo with the authenticated user
    });

    await newTodo.save();

    res.status(201).json({
      success: true,
      message: "Todo added successfully.",
      todo: newTodo,
    });
  } catch (err) {
    console.error("Error adding Todo:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the todo.",
    });
  }
};

const GetTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching Todos:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching todos.",
    });
  }
};

const UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed status must be a boolean.",
      });
    }

    const todo = await Todo.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    todo.completed = completed;
    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo completed status updated successfully.",
      todo: updatedTodo,
    });
  } catch (err) {
    console.error("Error updating Todo:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the todo.",
    });
  }
};

const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id }); // Find by ID and user

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully.",
      todo,
    });
  } catch (err) {
    console.error("Error deleting Todo:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the todo.",
    });
  }
};

module.exports = { AddTodo, UpdateTodo, DeleteTodo, GetTodos };
