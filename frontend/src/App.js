import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import NewNote from "./pages/NewNote";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

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
              <Route path="/notes/:noteId" element={<PrivateRoute />}>
                <Route path="/notes/:noteId" element={<Note />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
