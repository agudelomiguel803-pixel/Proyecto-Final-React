import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  const ok = await login(userInput, password); 
  if (ok) {
    navigate("/");
  } else {
    alert("Credenciales incorrectas");
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* 🔥 FONDO */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* 🔥 EFECTOS — más pequeños en móvil */}
      <div className="absolute w-48 md:w-96 h-48 md:h-96 bg-orange-500/20 blur-3xl rounded-full top-10 left-5 md:left-10" />
      <div className="absolute w-36 md:w-72 h-36 md:h-72 bg-red-500/20 blur-3xl rounded-full bottom-10 right-5 md:right-10" />

      {/* 🧾 CARD */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,100,0,0.3)] w-full max-w-sm">

        {/* ICONO */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg text-lg">
            E
          </div>
        </div>

        {/* TITULO */}
        <h2 className="text-center text-white text-xl md:text-2xl font-bold tracking-widest uppercase">
          ACCESO
        </h2>

        <p className="text-center text-orange-400 text-sm mb-6">
          Ingresa tu cuenta
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Usuario"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="bg-black/40 border border-orange-500/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/40 border border-orange-500/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-bold tracking-widest uppercase hover:from-orange-400 hover:to-red-500 hover:scale-105 transition-all duration-200 text-sm md:text-base"
          >
            INGRESAR →
          </button>

        </form>
      </div>
    </div>
  );
}