const express = require("express");
const midware = require("../Middlewares/auth");
const cors = require("cors");
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
const dbhelper = require("../Database/dbhelper");
app.post("/signup", midware.AuthUser, function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    dbhelper.SignupUser({ username, password });
    res.send({ Message: "User Successfully Signed Up" });
  } catch (err) {}
});
app.post("/login", async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const userFound = await dbhelper.FindUser(username, password);
    if (userFound) {
      const token = midware.GenerateToken({ username, id: userFound._id });
      res.send({ ResponseMessage: "User Authenticated", token: token });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {}
});
app.post("/AddTodo", async function (req, res) {
  try {
    const todoitem = req.body.TodoText;
    const tododesc = req.body.TodoDesc;
    dbhelper.AddTodoItem(todoitem, tododesc);
    res.send({ Message: "Todo Item Added in Database" });
  } catch (err) {}
});
app.get("/FetchAllTodos", async function (req, res) {
  try {
    const todos = await dbhelper.GetAllTodos();
    res.send(todos);
  } catch (err) {}
});
app.get("/DeleteTodo", async function (req, res) {
  try {
    const id = req.query.id;
    await dbhelper.DeleteTodo(id);
    res.send({ Message: "Todo Item Deleted From Database" });
  } catch (err) {}
});
app.listen(port, function () {
  console.log("Server is running on the port: " + port);
});

app.use("*", function (err, req, res, next) {
  res.send("The End Point you are requesting is not present");
});
