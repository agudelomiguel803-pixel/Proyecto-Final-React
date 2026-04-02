import { createContext, useContext, useState, useEffect } from "react"

export const ProductosContext = createContext()

const API = "https://ecommerce-backend-production-bd25.up.railway.app/api/productos"
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)


  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error)
        setCargando(false)
      })
  }, [])


  const agregarProducto = async (nuevo) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...nuevo, categoria: "general" }),
      })
      const data = await res.json()
      setProductos((prev) => [...prev, data])
    } catch (error) {
      console.error("Error al agregar:", error)
    }
  }

 
  const eliminarProducto = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" })
      setProductos((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }


  const editarProducto = async (id, datos) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, categoria: "general" }),
      })
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...datos } : p))
      )
    } catch (error) {
      console.error("Error al editar:", error)
    }
  }

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, eliminarProducto, editarProducto, cargando }}>
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  return useContext(ProductosContext)
}