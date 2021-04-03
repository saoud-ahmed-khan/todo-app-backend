const express = require("express");
const { usercontroller } = require("../controller/index");
const app = express();
const Router = express.Router();

Router.get("/", usercontroller.usermain);
Router.post("/signup", usercontroller.signup);
Router.get("/:id", usercontroller.finduserById);
Router.post("/login", usercontroller.login);

exports.userRouter = app.use("/user", Router);
