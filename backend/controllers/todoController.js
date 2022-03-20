const asyncHandler = require("express-async-handler");
const { status } = require("express/lib/response");
const Todo = require("../models/todoModel");

// @desc    Get todos
// @route   GET /api/todos/
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  // p:  current page
  // _page: get whiche page, based on _limit, default: 1
  // _limit: get {limit} todos, default: 10

  let { _page: page, _limit: limit, _q: q } = req.query;

  // _page is a integer and >= 1
  if (!page) {
    page = 1;
  }
  page = Math.round(page * 1);
  if (page <= 0) {
    page = 1;
  }
  // q: query keyord
  if (!q) {
    q = "";
  }
  // limit, default: 10
  limit = Math.round(limit * 1);
  if (limit < 0) {
    limit = 10;
  } else if (limit > 20) {
    limit = 20;
  }
  const todos = await Todo.paginate(
    {
      title: {
        $regex: new RegExp(q),
      },
      $or: [{ status: "public" }, { author: req.user.id }],
    },
    { page, limit }
  );

  res.status(200).json(todos);
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    res.status(400);
    throw new Error("Please fill out the form");
  }

  const todo = await Todo.create({
    author: req.user.id,
    title,
    description,
    status: status || "public",
  });
  res.status(200).json(todo);
});

module.exports = {
  getTodos,
  createTodo,
};

// <http://localhost:3004/todos?_page=1&_limit=4>; rel="first",
// <http://localhost:3004/todos?_page=1&_limit=4>; rel="prev",
//  <http://localhost:3004/todos?_page=2&_limit=4>; rel="last"
