const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv/config");

const userRegister = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(404)
        .json({ msg: `user with username ${username} already exists ` });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ msg: `user with username ${username} registered`, newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: `something went wrong registeration failed` });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `user with username ${username} not found ` });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "invalid credentials" });
    }
    var token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.WhatIsYourName,
      { expiresIn: "1h" }
    );
    console.log("token", token);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: `something went wrong login failed` });
  }
};

module.exports = { userLogin, userRegister };
