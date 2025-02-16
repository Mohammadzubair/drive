const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});

// Validation Register Middleware
const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .trim()
    .isEmail()
    .isLength({ min: 13 })
    .withMessage("Email must be at least 13 characters long"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password does not match");
    }
    return true;
  }),
];

router.post("/register", validateRegister, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Invalid data" });
  }

  const { email, username, password, confirm_password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const hashConfirmPassword = await bcrypt.hash(confirm_password, 10);

  const newUser = await userModel.create({
    email,
    username,
    password: hashPassword,
    confirm_password: hashConfirmPassword,
  });

  res.json(newUser);
});

router.get("/login", (req, res) => {
  res.render("login");
});

// Validation Login Middleware
const validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Email must be at least 13 characters long"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
      message: "Invalid data",
    });
  }

  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.cookie("token", token);
  res.send("User login successful");
});

module.exports = router;
