import { Link } from "react-router-dom"
import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"

function ProductoCard({ producto }) {
  const { setCarrito } = useContext(CarritoContext)

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id)
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        )
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }]
      }
    })
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-orange-700/20 hover:border-orange-500/30 hover:scale-[1.02] transition-all duration-300 flex flex-col group">

      {/* 🖼 Imagen */}
      <div className="overflow-hidden relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 📦 Info */}
      <div className="p-2.5 sm:p-4 flex flex-col gap-1.5 text-white flex-1">

        {/* Nombre — 2 líneas máximo */}
        <h5 className="text-xs sm:text-sm md:text-base font-bold tracking-wide uppercase text-white line-clamp-2 leading-tight">
          {producto.nombre}
        </h5>

        <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />

        {/* Precio — más pequeño en móvil */}
        <p className="text-sm sm:text-base md:text-xl font-bold text-orange-500">
          ${Number(producto.precio).toLocaleString("es-CO")}
        </p>

        {/* Botones */}
        <div className="mt-auto flex flex-col gap-1.5 pt-1">
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="w-full py-1.5 sm:py-2 rounded-xl font-bold text-white text-xs tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-md shadow-orange-700/30 transition-all duration-200"
          >
            🛒 Agregar
          </button>

          <Link
            to={`/producto/${producto.id}`}
            className="w-full py-1.5 sm:py-2 rounded-xl text-center text-xs font-semibold tracking-widest uppercase text-white/70 border border-white/10 hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200"
          >
            Ver detalle →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductoCard