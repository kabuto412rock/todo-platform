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

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
