const jwt = require("jsonwebtoken");

const { userModel } = require("../model");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.send({ success: false, message: "token is missing" });
  }
  try {
    const decode = await jwt.verify(token,"saoud")
    const user = await userModel.findById({ _id: decode.id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User does not exist" });
    }
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error:", error.message);
    res.status(401).json({ message: "Token is not valid", success: false });
  }
};
