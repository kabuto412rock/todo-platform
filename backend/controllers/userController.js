const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields of the register form");
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);

  //   Find if user already exists
  const userExists = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, salt);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "login user",
  });
});

// @desc    Show user's profile
// @route   GET /api/users/:userId
// @access  Private
const showUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Show user's profile",
  });
});

module.exports = {
  registerUser,
  loginUser,
  showUser,
};
