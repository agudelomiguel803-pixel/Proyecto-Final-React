import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const totalItems = carrito.reduce(
    (acc, prod) => acc + (prod.cantidad || 1),
    0
  );

  if (!user) return null;

  return (
    <nav className="bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/10 text-white sticky top-0 z-50 shadow-lg shadow-black/40">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/*  LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md shadow-orange-700/40 group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-base md:text-lg font-bold tracking-widest uppercase text-white">
            Ecommerce <span className="text-orange-500">ADSO</span>
          </span>
        </Link>

      
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-orange-400 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            Inicio
          </Link>

          <Link
            to="/carrito"
            className="relative text-gray-400 hover:text-orange-400 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-5 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm shadow-orange-700/40">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="w-px h-5 bg-white/10" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-orange-400 text-xs font-bold uppercase">
                {user.username?.charAt(0)}
              </span>
            </div>
            <span className="text-gray-400 text-sm font-medium">
              {user.username}
            </span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-xl font-bold text-white text-sm tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-md shadow-orange-700/30 hover:scale-105 transition-all duration-200"
          >
            Salir →
          </button>
        </div>

        {/*  LADO DERECHO MÓVIL — carrito + hamburguesa */}
        <div className="flex md:hidden items-center gap-3">

          {/* 🛒 Carrito visible siempre en móvil */}
          <Link
            to="/carrito"
            className="relative text-gray-400 hover:text-orange-400 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>

         
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-200 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-200 ${menuAbierto ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-200 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

      </div>

     
      {menuAbierto && (
        <div className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-3">

          {/* Usuario */}
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-orange-400 text-sm font-bold uppercase">
                {user.username?.charAt(0)}
              </span>
            </div>
            <span className="text-gray-400 text-sm font-medium">
              {user.username}
            </span>
          </div>

          <Link
            to="/"
            onClick={() => setMenuAbierto(false)}
            className="text-gray-400 hover:text-orange-400 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 py-1"
          >
            Inicio
          </Link>

          <Link
            to="/carrito"
            onClick={() => setMenuAbierto(false)}
            className="text-gray-400 hover:text-orange-400 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 py-1"
          >
            Carrito {totalItems > 0 && (
              <span className="ml-2 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => { logout(); setMenuAbierto(false); }}
            className="w-full py-2.5 rounded-xl font-bold text-white text-sm tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-md shadow-orange-700/30 transition-all duration-200 mt-1"
          >
            Salir →
          </button>
        </div>
      )}

    </nav>
  );
}

export default Navbar;