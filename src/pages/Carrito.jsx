import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"

function Carrito() {
  const { carrito, setCarrito } = useContext(CarritoContext)

  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * (prod.cantidad || 1),
    0
  )

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((prod) => prod.id !== id))
  }

  const formatPrecio = (valor) =>
    Number(valor).toLocaleString("es-CO")

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white py-8 px-4 overflow-hidden">

      {/* 🔴 Glows de fondo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-700/40 mb-3">
            <span className="text-xl md:text-2xl">🛒</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase">
            Carrito
          </h2>
          <p className="text-orange-500 font-semibold mt-1 tracking-wide text-sm md:text-base">
            Resumen de tu compra
          </p>
        </div>

        {/* VACÍO */}
        {carrito.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center shadow-2xl shadow-black/60">
            <p className="text-gray-400 text-base md:text-lg">😕 El carrito está vacío</p>
          </div>
        ) : (
          <>
            {/* 🛒 Lista */}
            <div className="space-y-4">
              {carrito.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3 shadow-lg shadow-black/40"
                >
                  {/* Imagen + info */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-sm md:text-lg text-white tracking-wide uppercase truncate">
                        {prod.nombre}
                      </h5>

                      <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full my-1" />

                      <p className="text-xs md:text-sm text-gray-400">
                        Cantidad:{" "}
                        <span className="text-white font-semibold">
                          {prod.cantidad || 1}
                        </span>
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        ${formatPrecio(prod.precio)} c/u
                      </p>
                      <p className="font-bold text-orange-500 text-sm md:text-base">
                        Subtotal: ${formatPrecio(prod.precio * (prod.cantidad || 1))}
                      </p>
                    </div>
                  </div>

                  {/* ❌ Eliminar */}
                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="flex-shrink-0 px-3 md:px-4 py-2 rounded-xl font-bold text-white tracking-widest uppercase text-xs md:text-sm bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 hover:scale-105 transition-all duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            {/* 💰 Total */}
            <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 flex justify-between items-center shadow-2xl shadow-black/60">
              <h4 className="text-base md:text-lg font-semibold text-white tracking-wide uppercase">
                Total
              </h4>
              <span className="text-xl md:text-2xl font-bold text-orange-500">
                ${formatPrecio(total)}
              </span>
            </div>

            {/* ✅ Botón Pagar */}
            <button className="mt-4 w-full py-3 md:py-4 rounded-xl font-bold text-white text-sm md:text-base tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 hover:scale-[1.02] transition-all duration-200">
              Pagar →
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default Carrito