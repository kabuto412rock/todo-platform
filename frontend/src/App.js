import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div
          style={{
            background: "#fff",
            maxWidth: "1024px",
            minHeight: "600px",
            margin: "8px auto",
            padding: "8px",
            paddingBottom: "16px",
            borderRadius: "8px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
