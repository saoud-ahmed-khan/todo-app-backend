const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

const { userModel } = require("../model/user.model");

exports.usermain = async (req, res) => {
  res
    .status(200)
    .send({ success: true, message: "you are in user root directory" });
};
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "username or password not found",
    });
  }
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({
        success: false,
        message: "user already exsist",
      });
    }
    const salt = await bcrypt.genSalt(9);
    const hashPass = await bcrypt.hash(password, salt);
    const createUser = await userModel.create({
      username: username,
      password: hashPass,
    });
    createUser.save();
    res.json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      error: error.message,
      message: " internal server error",
    });
  }
};
exports.finduserById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.json({
      success: false,
      message: "user id not provided",
    });
  }
  try {
    const user = await userModel.findById({ _id: id }).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "user do not  exsist",
      });
    }
    res.json({
      success: true,
      user: user,
      message: "user exsist",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      error: error.message,
      message: " internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "username or password not saoud found",
    });
  }
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "user not exsist",
      });
    }
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
      return res.json({
        success: false,
        message: "password error",
      });
      return res.json({
        success: true,
        message: "you are login",
        user: user,
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      success: false,
      error: e.message,
      message: " internal server error",
    });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "username or password not found",
    });
  }
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "user not found in databse" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ success: false, message: "password not match" });
    }
    const payload = {
      username: user.username,
      id: user._id,
    };
   const token= await jwt.sign(payload,"saoud")

    return res.json({ success: true, message:"success",   user ,token});
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      error: error.message,
      message: " internal server error",
    });
  }
};