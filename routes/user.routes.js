const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 6 }),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  async (req, res) => {
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
  }
);

module.exports = router;
