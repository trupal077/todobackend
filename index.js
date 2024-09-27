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
const app = express();

app.use(cors()); 

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/addTodo", AddTodo);
app.get("/api/todos", GetTodos);
app.put("/api/todos/:id", UpdateTodo);
app.delete("/api/todos/:id", DeleteTodo);

app.listen(5000, () => {
  console.log("App listening at port 5000");
});
