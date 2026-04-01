import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {

  // 🔥 cargar carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const data = localStorage.getItem("carrito");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // 🔄 guardar automáticamente
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}