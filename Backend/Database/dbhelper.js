const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shyamzod03:KRrs9969@cluster0.mthpzyr.mongodb.net/TodoApplication"
);
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Users = mongoose.model("Users", UserSchema);
async function SaveUser(user) {
  await user.save();
}
const TodoSchema = new mongoose.Schema({
  todoitem: String,
  tododesc: String,
});
const Todos = mongoose.model("Todos", TodoSchema);
async function SaveTodo(todo) {
  await todo.save();
}
function SignupUser(user) {
  try {
    const newUser = new Users(user);
    SaveUser(newUser);
  } catch (err) {}
}
function AddTodoItem(todoitem, tododesc) {
  try {
    let obj = { todoitem: todoitem, tododesc: tododesc };
    const newTodo = new Todos(obj);
    SaveTodo(newTodo);
  } catch (err) {}
}
async function FindUser(username, password) {
  try {
    const user = await Users.findOne({ username, password });
    if (user != undefined) {
      return user;
    }
    return false;
  } catch (err) {}
}
async function GetAllTodos() {
  const alltodos = await Todos.find();
  return alltodos;
}
async function DeleteTodo(id) {
  await Todos.deleteOne({ _id: id });
}

module.exports = { SignupUser, FindUser, AddTodoItem, GetAllTodos, DeleteTodo };
