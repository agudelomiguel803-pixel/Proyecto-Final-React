import { useParams } from "react-router-dom"
import { useState, useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import { useProductos } from "../context/ProductosContext"

function Detalle() {
  const { id } = useParams()
  const { productos } = useProductos()

  const producto = productos.find((p) => p.id == id)

  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState(false)
  const { setCarrito } = useContext(CarritoContext)

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id)
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      } else {
        return [...prevCarrito, { ...producto, cantidad }]
      }
    })
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  if (!producto) return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <p className="text-gray-400 text-xl">😕 Producto no encontrado</p>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] flex items-start md:items-center justify-center p-4 md:p-6 overflow-hidden">

      
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-5 md:p-8 shadow-2xl shadow-black/60 my-6">

       
        <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-white/10">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-56 sm:h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-wide uppercase">
              {producto.nombre}
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4" />
            <p className="text-gray-400 mb-4 leading-relaxed text-sm md:text-base">
              {producto.descripcion}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
              ${Number(producto.precio).toLocaleString("es-CO")}
            </p>

         
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setCantidad(cantidad - 1)}
                disabled={cantidad <= 1}
                className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/10 rounded-full text-lg text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition disabled:opacity-40"
              >
                -
              </button>
              <span className="text-xl font-semibold text-white w-6 text-center">
                {cantidad}
              </span>
              <button
                onClick={() => setCantidad(cantidad + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/10 rounded-full text-lg text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition"
              >
                +
              </button>
              <span className="text-gray-500 text-sm ml-2">unidades</span>
            </div>
          </div>

        
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="w-full py-3 md:py-4 rounded-xl font-bold text-white text-sm md:text-base tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 hover:scale-[1.02] transition-all duration-200"
          >
            🛒 Agregar al carrito
          </button>

          {mensaje && (
            <div className="bg-green-500/10 border border-green-400/30 text-green-400 py-2 px-4 rounded-xl text-center font-medium tracking-wide text-sm">
              ✅ Producto agregado al carrito
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Detalle