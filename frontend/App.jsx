import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
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
