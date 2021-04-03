const express = require("express");
const app = express();
const Router = express.Router();
const { todocontroller } = require("../controller/index");
const { authMiddleware } = require("../middleware/index");

Router.get("/", todocontroller.todomain);

Router.get("/getTodos", authMiddleware, todocontroller.getTodo);

Router.post("/createTodo", authMiddleware, todocontroller.createTodos);

Router.post("/createTodo", authMiddleware, todocontroller.createTodos);

Router.put("/:id", authMiddleware, todocontroller.updateTodo);

Router.delete("/:id", authMiddleware, todocontroller.DeleteTodo);

exports.todoRouter = app.use("/todo", Router);
