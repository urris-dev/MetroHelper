import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Workspace from './components/Workspace/Workspace';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Main Page</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
