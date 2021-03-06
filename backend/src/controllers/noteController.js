const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

// @desc    Get user note
// @route   GET /api/notes/:id
// @access  Private
const getNote = asyncHandler(async (req, res) => {
  let note = await Note.findOne({
    _id: req.params.noteId,
    $or: [{ status: "public" }, { author: req.user.id }],
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  // 取得author對應的用戶名稱
  const author = await User.findOne({
    _id: note.author,
  });

  let authorName = "不存在";
  if (author) {
    authorName = author.name;
  }
  note._doc.authorName = authorName;

  res.status(200).json(note);
});

// @desc    Get notes
// @route   GET /api/notes/
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //      q: query keyword
  //  _page: get whiche page, based on _limit, default: 1
  // _limit: get {limit} notes, default: 10

  let { _page: page, _limit: limit, _q: q, _sort: sortStr } = req.query;

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

  if (!sortStr) {
    sortStr = '{"updatedAt":-1}';
  }

  let sort = JSON.parse(sortStr);

  const notes = await Note.paginate(
    {
      title: {
        $regex: new RegExp(q),
      },
      $or: [{ status: "public" }, { author: req.user.id }],
    },
    {
      page,
      limit,
      sort,
    }
  );

  res.status(200).json(notes);
});

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, description, status, category } = req.body;

  if (!title || !description || !status) {
    res.status(400);
    throw new Error("Please fill out the form");
  }

  const note = await Note.create({
    author: req.user.id,
    title,
    description,
    status: status || "public",
    category,
  });
  res.status(200).json(note);
});

// @desc    Uupdate note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedNote);
});

// @desc    Delete note
// @route   Delete /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await note.remove();
  res.status(200).json({
    success: true,
    message: "Delete Note Success",
  });
});
module.exports = {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

// <http://localhost:3004/notes?_page=1&_limit=4>; rel="first",
// <http://localhost:3004/notes?_page=1&_limit=4>; rel="prev",
//  <http://localhost:3004/notes?_page=2&_limit=4>; rel="last"
