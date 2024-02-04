import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TodoComponent() {
  const [TodoText, setTodoText] = useState("");
  const [TodoDesc, setTodoDesc] = useState("");
  const [TodoList, setTodoList] = useState([]);

  useEffect(() => {
    async function mountAllTodos() {
      const allTodos = await fetch("http://localhost:3000/FetchAllTodos");
      const data1 = await allTodos.json();
      setTodoList(data1);
    }
    mountAllTodos();
  }, [TodoList]);

  const handleAddTodoItem = (evt) => {
    setTodoText(evt.target.value);
  };

  const handleAddTodoDesc = (evt) => {
    setTodoDesc(evt.target.value);
  };

  const handleAddTodo = async () => {
    if (TodoText === "" || TodoDesc === "") {
      toast("Item and Description cannot be empty..");
      return;
    }
    const obj = { TodoText, TodoDesc };
    const data = await fetch("http://localhost:3000/AddTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const jsondata = await data.json();
    toast(jsondata.Message);
    setTodoText("");
    setTodoDesc("");
  };

  const handleDeleteTodoItem = async (id) => {
    const data = await fetch(`http://localhost:3000/DeleteTodo?id=${id}`);
    const jsondata = await data.json();
    toast(jsondata.Message);
    setTodoList((prevList) => prevList.filter((todo) => todo._id !== id));
  };

  return (
    <div className="container mx-auto p-10 w-fullmin-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Todo List
        </h1>
        <div className="flex justify-between mb-4">
          <div className="flex-grow mr-4">
            <label
              htmlFor="Todo_Title"
              className="block text-sm font-medium text-gray-700"
            >
              Todo Title
            </label>
            <input
              type="text"
              id="Todo_Title"
              className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a title"
              required
              onChange={handleAddTodoItem}
              value={TodoText}
            />
          </div>
          <div className="flex-grow mr-4">
            <label
              htmlFor="Todo_Desc"
              className="block text-sm font-medium text-gray-700"
            >
              Todo Description
            </label>
            <input
              type="text"
              id="Todo_Desc"
              className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a description"
              required
              onChange={handleAddTodoDesc}
              value={TodoDesc}
            />
          </div>
          <button
            type="button"
            className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>

        <div className="mt-4"></div>
        <div className="mt-8">
          {TodoList.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between bg-gray-200 p-3 mb-2 rounded-md shadow-md"
            >
              <p className="text-gray-800">{todo.todoitem}</p>
              <p className="text-gray-600">{todo.tododesc}</p>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-900"
                onClick={() => handleDeleteTodoItem(todo._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
