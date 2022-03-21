import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import PaginatedItems from "./pages/PaginatedItems";

import NewNote from "./pages/NewNote";
import Notes from "./pages/Notes";
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
              <Route path="new-note" element={<PrivateRoute />}>
                <Route path="/new-note" element={<NewNote />} />
              </Route>
              <Route path="notes" element={<PrivateRoute />}>
                <Route path="/notes" element={<Notes />} />
              </Route>
              <Route path="/pageitems" element={<PaginatedItems />} />
            </Routes>
          </div>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
