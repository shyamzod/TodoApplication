import "./App.css";
import SignUpComponent from "./components/SignUpComponent";
import TodoComponent from "./components/TodoComponent";
import "./index.css";
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpComponent />}></Route>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/Home" element={<TodoComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
