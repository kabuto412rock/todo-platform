const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

// @desc    Get user todo
// @route   GET /api/todos/:id
// @access  Private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.todoId,
    $or: [{ status: "public" }, { author: req.user.id }],
  });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  // if (todo.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("Not Authorized");
  // }

  res.status(200).json(todo);
});

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
    {
      page,
      limit,
      sort: { updatedAt: -1, title: 1 },
    }
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

// @desc    Uupdate todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.todoId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedTodo);
});

// @desc    Delete todo
// @route   Delete /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await todo.remove();
  res.status(200).json({
    success: true,
    message: "Delete Todo Success",
  });
});
module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

// <http://localhost:3004/todos?_page=1&_limit=4>; rel="first",
// <http://localhost:3004/todos?_page=1&_limit=4>; rel="prev",
//  <http://localhost:3004/todos?_page=2&_limit=4>; rel="last"
