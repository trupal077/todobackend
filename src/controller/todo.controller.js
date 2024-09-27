const Todo = require("../model/todo.model");

const AddTodo = async (req, res) => {
  try {
    // Validate the request body
    const { todo_name, completed, status } = req.body;
    if (!todo_name) {
      return res.status(400).json({
        success: false,
        message: "Todo todo_name is required.",
      });
    }

    const newTodo = new Todo({
      todo_name,
      completed: completed || false,
    });

    await newTodo.save();

    // Respond with success and return the newly created Todo
    res.status(201).json({
      success: true,
      message: "Todo added successfully.",
      todo: newTodo,
    });
  } catch (err) {
    console.error("Error adding Todo:", err);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the todo.",
    });
  }
};

const GetTodos = async (req, res) => {
  try {
    // Fetch todos and sort by creation date in descending order
    const todos = await Todo.find().sort({ createdAt: -1 }); // Sorts by 'createdAt' field in descending order
    res.status(200).json(todos); // Send only the todos data
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
    const { id } = req.params; // Get the Todo ID from the request params
    const { completed } = req.body; // Get the completed status from the request body

    // Check if completed is provided and is a boolean
    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "Completed status must be a boolean.",
      });
    }

    // Find the Todo by ID and update the completed status
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed }, // Only update the completed field
      { new: true } // Return the updated document
    );

    // Check if the Todo was found
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    // Return the updated Todo
    res.status(200).json({
      success: true,
      message: "Todo completed status updated successfully.",
      todo: updatedTodo,
    });
  } catch (err) {
    console.error("Error updating Todo:", err);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the todo.",
    });
  }
};


const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get the Todo ID from the request params

    // Find the Todo by ID and delete it
    const deletedTodo = await Todo.findByIdAndDelete(id);

    // Check if the Todo was found and deleted
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    // Return success if the Todo was deleted
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully.",
      todo: deletedTodo,
    });
  } catch (err) {
    console.error("Error deleting Todo:", err);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the todo.",
    });
  }
};

module.exports = { AddTodo, UpdateTodo, DeleteTodo, GetTodos };
