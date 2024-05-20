import express from "express";
import todoModel from "../models/todo.js";

const TodosRouter = express.Router();

/* LIST OF ALL TODOS */
const handleTodoList = async (req, res) => {
  const todos = await todoModel.find({});

  let payload = {
    message: "Fetching user is successfull",
    data: todos,
  };

  res.status(200).send(payload);
};

/* GET SINGLE TODO ITEM */
const handleTodoById = async (req, res) => {
  const { id } = req.params;
  const todos = await todoModel.find({ _id: id });
  let payload = {
    message: "Fetching todo is successfull",
    data: todos,
  };
  res.status(200).send(payload);
};

/* ADDING A NEW TODO */
const handleAddTodoItem = async (req, res) => {
  let { title } = req.body;

  let dataPayload = {};

  if (!title || title == undefined)
    return res.status(401).send("Missing required field of title");

  try {
    let newTodo = new todoModel({ title: title });
    let savedTodo = await newTodo.save();
    dataPayload = {
      message: "New Todo has been added successfully",
      addedTodo: savedTodo
    };
    return res.status(201).send(dataPayload);
  } catch (error) {
    return res.status(500).send("Found eror while adding a new todo");
  } finally {
    mongoose.connection.close();
  }
};

async function handleTodoUpdate(req, res) {
  const { todoId } = req.params;

  const { title = "", status = "" } = req.body;

  const updateData = { title, status };

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === "") {
      delete updateData[key];
    }
  });

  if (Object.keys(updateData).length == 0)
    return res.status(406).send("No matching fields found to update");

  const recordExists = await todoModel.exists({ _id: todoId });

  if (!recordExists) return res.status(404).send("record not found");

  let dataPayload = {};

  try {
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: todoId },
      updateData,
      { new: true }
    );

    if (updatedTodo) {
      dataPayload = {
        message: "Todo has been updated successfully!",
        updatedTodo: updatedTodo,
      };
      res.status(200).send(dataPayload);
    }
  } catch (error) {
    dataPayload = {
      message: "cannot handle the operation",
      error: error,
    };
    res.status(500).send(dataPayload);
  }
}

/* DELETE TODO BY ID*/
const handleDeleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = await todoModel.findByIdAndDelete(id);

    if (deleteTodo) return res.status(200).send("Todo deleted with id: " + id);

    return res.status(404).send("Todo not found with id: " + id);
  } catch (error) {
    return res.status(500).send({
      message: "operation failed",
      error: error,
    });
  }
};

TodosRouter.get("/", handleTodoList);
TodosRouter.get("/:id", handleTodoById);
TodosRouter.post("/", handleAddTodoItem);
TodosRouter.put("/:todoId", handleTodoUpdate);
TodosRouter.delete("/:id", handleDeleteTodo);

export default TodosRouter;
