import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import NewTodo from "./pages/NewTodo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col h-screen" data-theme="cupcake">
          <Header />
          <div className="flex flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="new-todo" element={<PrivateRoute />}>
                <Route path="/new-todo" element={<NewTodo />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
