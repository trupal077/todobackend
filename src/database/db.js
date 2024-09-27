const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = "mongodb+srv://trupal0025:2MRRP5oAEi1hb9Xq@cluster0.ytcxt.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  dbName: "demo",
};

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Successfully connected to the demo database.");

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected. Trying to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected.");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
