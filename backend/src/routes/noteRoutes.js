const express = require("express");
const router = express.Router();

const {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, createNote);
router
  .route("/:noteId")
  .get(protect, getNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
