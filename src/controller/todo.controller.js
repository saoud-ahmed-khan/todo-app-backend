const ObjectID = require("mongoose").Types.ObjectId;
const { todoModel } = require("../model");
exports.todomain = async (req, res) => {
  return res
    .status(200)
    .send({ success: true, message: "you are in todo root directory" });
};

exports.getTodo = async (req, res) => {
  const { id } = req.user;
  if (!ObjectID.isValid(id)) {
    return res.json({
      success: false,
      message: "user id not provided",
    });
  }
  try {
    const todo = await todoModel.find({ createdBy: id });

    if (todo.length < 1) {
      return res.status(404).send({
        success: false,
        message: "no todo found of the respective user",
      });
    }
    res.status(200).send({ success: true, message: "todo found", todo: todo });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

exports.createTodos = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  if (!title && !description && !isCompleted) {
    return res.status(404).send({
      success: false,
      message: "data incomplete",
    });
  }
  try {
    const todo = await todoModel.create({
      title,
      description,
      isCompleted,
      createdBy: req.user.id,
    });
    todo.save();
    res.json({
      success: true,
      message: `todo created by ${req.user.username}`,
      todo,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!ObjectID.isValid(id)) {
    return res.json({
      success: false,
      message: "user id not provided",
    });
  }

  const todosAvailabilityOfRespectiveUser = await todoModel.find({
    createdBy: user.id,
  });

  if (todosAvailabilityOfRespectiveUser < 1) {
    return res.json({
      success: false,
      message: "user do not create any todos yet",
    });
  } else {
    let todooFUser = {};
    todooFUser = todosAvailabilityOfRespectiveUser.find((todo) => {
      return todo._id == id;
    });
    console.log(todooFUser);
    if (!todooFUser) {
      return res.json({
        success: false,
        message: "please provide valide todo",
      });
    }
  }

  //in update key we got weither the user any of the keys in req on not..
  const upedateKeys = Object.keys(req.body);
  //in allowKeys we are providing all the expected keys which may come from the req
  const allowKeys = ["title", "description", "isCompleted"];
  //here we are checking either we get our required kes ofr not
  const isValidKeys = upedateKeys.every((key) => allowKeys.includes(key));

  if (upedateKeys.length < 1) {
    return res.json({
      success: false,
      message: "please provide data for update",
    });
  }

  if (!isValidKeys) {
    return res.json({
      success: false,
      message: "please provide valid keys",
    });
  }

  try {
    const updatetodo = await todoModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatetodo) {
      return res
        .status(404)
        .send({ success: false, message: "unable to update the data" });
    }
    return res.send({
      success: true,
      updatetodo: updatetodo,
      message: "todo updated successfully",
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

exports.DeleteTodo = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!ObjectID.isValid(id)) {
    return res.json({
      success: false,
      message: "user id not provided",
    });
  }

  const todosAvailabilityOfRespectiveUser = await todoModel.find({
    createdBy: user.id,
  });

  if (todosAvailabilityOfRespectiveUser < 1) {
    return res.json({
      success: false,
      message: "user do not create any todos yet",
    });
  } else {
    let todooFUser = {};
    todooFUser = todosAvailabilityOfRespectiveUser.find((todo) => {
      return todo._id == id;
    });
    console.log(todooFUser);
    if (!todooFUser) {
      return res.json({
        success: false,
        message: "please provide valide todo",
      });
    }
  }
  try {
    const DeleteTask = await todoModel.findByIdAndDelete(id);
    if (!DeleteTask) {
      return res.json({
        success: false,
        message: "your task not deleted",
      });
    }
    return res.send({
      success: true,
      message: "todo deleted successfully",
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
