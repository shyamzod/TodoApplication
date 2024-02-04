import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function changeUsername(evt) {
    setUsername(evt.target.value);
  }

  function changePassword(evt) {
    setPassword(evt.target.value);
  }

  function signUp() {
    navigate("/signup");
  }

  async function login() {
    if (username === "" || password === "") {
      setMessage("Username or Password cannot be empty");
      return;
    }

    const obj = { username: username, password: password };

    try {
      let data = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      let res = await data;
      console.log(res);
      setMessage(res);
      navigate("/Home");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="MainDiv bg-gray-100 p-6 sm:w-2/3 lg:w-1/2 xl:w-1/3 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            UserName
          </label>
          <input
            type="text"
            name="userName"
            value={username}
            placeholder="Enter Your UserName"
            onChange={changeUsername}
            className="mt-1 p-2 border rounded-md w-full sm:w-64" // Adjust the width as needed
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={changePassword}
            className="mt-1 p-2 border rounded-md w-full sm:w-64" // Adjust the width as needed
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-5">
          <button
            onClick={login}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={signUp}
            className="bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto mt-2 sm:mt-0"
          >
            SignUp
          </button>
        </div>
        <div className="mt-4">
          <h4 className="text-red-500">{message}</h4>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
