const express = require("express");
const router = express.Router();

const { getTodos, createTodo } = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTodos).post(protect, createTodo);

module.exports = router;
