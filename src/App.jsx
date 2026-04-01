import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Detalle from "./pages/Detalle";

import { useAuth } from "./context/AuthContext"; 

function App() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-full min-h-screen overflow-x-hidden">

      {user && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/"
          element={user ? <Productos /> : <Navigate to="/login" />}
        />

        <Route
          path="/carrito"
          element={user ? <Carrito /> : <Navigate to="/login" />}
        />

        <Route
          path="/producto/:id"
          element={user ? <Detalle /> : <Navigate to="/login" />}
        />
      </Routes>

    </div>
  );
}

export default App;