require("dotenv").config(); // To load environment variables

const express = require("express");
const cors = require("cors");
const {
  AddTodo,
  UpdateTodo,
  DeleteTodo,
  GetTodos,
} = require("./src/controller/todo.controller");
const connectToDatabase = require("./src/database/db");
const { login, register } = require("./src/controller/auth.controller");
const { verifyToken } = require("./src/middleware/auth.middleware");

const app = express();
const router = express.Router(); // Use router

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// Connect to MongoDB
connectToDatabase();

// Routes defined using router
router.get("/", (req, res) => {
  res.send("Hello World");
});

// Authentication routes
router.post("/api/login", login);
router.post("/api/register", register);

// Todo routes
router.post("/api/addTodo", verifyToken, AddTodo);
router.get("/api/todos", verifyToken, GetTodos);
router.post("/api/todos/:id", verifyToken, UpdateTodo);
router.delete("/api/todos/:id", verifyToken, DeleteTodo);

// Attach the router to the app
app.use(router);

// Start the server
app.listen(5000, () => {
  console.log("App listening at port 5000");
});
