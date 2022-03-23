const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();

const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectMongoDB } = require("./config/db");
const PORT = process.env.PORT || 8000;
const app = express();

// Connect to database
connectMongoDB();

// Set parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the Support Desk API",
    });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
