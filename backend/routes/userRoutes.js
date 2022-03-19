const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  showUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);

router.get("/:userId", protect, showUser);

module.exports = router;
