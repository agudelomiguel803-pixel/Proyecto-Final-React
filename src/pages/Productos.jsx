import ProductCard from "../components/ProductoCard"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useProductos } from "../context/ProductosContext"

function Productos() {
  const { user } = useAuth()
  const { productos, agregarProducto, eliminarProducto, editarProducto } = useProductos()

  const [search, setSearch] = useState("")
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ nombre: "", precio: "", imagen: "" })
  const [exito, setExito] = useState(false)

  const [productoEditando, setProductoEditando] = useState(null)
  const [formEdit, setFormEdit] = useState({ nombre: "", precio: "", imagen: "" })

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleChangeEdit = (e) => setFormEdit({ ...formEdit, [e.target.name]: e.target.value })

  const handleAgregar = () => {
    if (!form.nombre || !form.precio || !form.imagen) return
    agregarProducto({
      nombre: form.nombre,
      precio: Number(form.precio),
      imagen: form.imagen,
      descripcion: "Producto agregado por el administrador.",
    })
    setForm({ nombre: "", precio: "", imagen: "" })
    setMostrarForm(false)
    setExito(true)
    setTimeout(() => setExito(false), 3000)
  }

  const abrirEditar = (prod) => {
    setProductoEditando(prod)
    setFormEdit({ nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen })
  }

  const handleEditar = () => {
    if (!formEdit.nombre || !formEdit.precio || !formEdit.imagen) return
    editarProducto(productoEditando.id, {
      nombre: formEdit.nombre,
      precio: Number(formEdit.precio),
      imagen: formEdit.imagen,
    })
    setProductoEditando(null)
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] py-8 px-3 sm:px-4 overflow-hidden">

      {/* 🔴 Glows de fondo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-800/20 rounded-full blur-3xl" />
      </div>

      {/* ✅ MODAL EDICIÓN */}
      {productoEditando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 w-full max-w-md shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold text-base md:text-lg tracking-widest uppercase mb-1">
              ✏️ Editar Producto
            </h3>
            <div className="w-10 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-5" />
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-400 text-sm tracking-wide uppercase mb-1 block">Nombre</label>
                <input type="text" name="nombre" value={formEdit.nombre} onChange={handleChangeEdit}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
              </div>
              <div>
                <label className="text-gray-400 text-sm tracking-wide uppercase mb-1 block">Precio</label>
                <input type="number" name="precio" value={formEdit.precio} onChange={handleChangeEdit}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
              </div>
              <div>
                <label className="text-gray-400 text-sm tracking-wide uppercase mb-1 block">URL de imagen</label>
                <input type="text" name="imagen" value={formEdit.imagen} onChange={handleChangeEdit}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
              </div>
              {formEdit.imagen && (
                <div className="rounded-xl overflow-hidden border border-white/10 h-36">
                  <img src={formEdit.imagen} alt="preview" className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = "none"} />
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <button onClick={() => setProductoEditando(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm tracking-widest uppercase border border-white/10 hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200">
                  Cancelar
                </button>
                <button onClick={handleEditar} disabled={!formEdit.nombre || !formEdit.precio || !formEdit.imagen}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  Guardar →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 🔥 TÍTULO — ✅ texto más pequeño en móvil para que no se corte */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-700/40 mb-3">
            <span className="text-white text-xl md:text-2xl font-bold">E</span>
          </div>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white tracking-tight sm:tracking-wider md:tracking-widest uppercase">
            Ecommerce ADSO
          </h2>
          <p className="text-orange-500 font-semibold mt-1 tracking-wide text-xs sm:text-sm md:text-base">
            Catálogo de productos
          </p>
        </div>

        {/* 🔐 PANEL ADMIN */}
        {user?.username === "admin" && (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setMostrarForm(!mostrarForm)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-xs md:text-sm tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 hover:scale-105 transition-all duration-200"
              >
                {mostrarForm ? "✕ Cancelar" : "+ Agregar producto"}
              </button>
            </div>

            {exito && (
              <div className="mb-4 bg-green-500/10 border border-green-400/30 text-green-400 py-2 px-4 rounded-xl text-center font-medium tracking-wide text-sm">
                ✅ Producto agregado exitosamente
              </div>
            )}

            {mostrarForm && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60 w-full max-w-xl mx-auto">
                <h3 className="text-white font-bold text-base md:text-lg tracking-widest uppercase mb-1">
                  Nuevo Producto
                </h3>
                <div className="w-10 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-5" />
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-gray-400 text-xs md:text-sm tracking-wide uppercase mb-1 block">Nombre</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Laptop HP ProBook"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs md:text-sm tracking-wide uppercase mb-1 block">Precio</label>
                    <input type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 1500000"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs md:text-sm tracking-wide uppercase mb-1 block">URL de imagen</label>
                    <input type="text" name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition" />
                  </div>
                  {form.imagen && (
                    <div className="rounded-xl overflow-hidden border border-white/10 h-36">
                      <img src={form.imagen} alt="preview" className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = "none"} />
                    </div>
                  )}
                  <button onClick={handleAgregar} disabled={!form.nombre || !form.precio || !form.imagen}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-lg shadow-orange-700/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                    Agregar producto →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 🔍 BUSCADOR */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="🔎 Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg shadow-black/30 transition text-sm md:text-base"
          />
        </div>

        {productosFiltrados.length === 0 && (
          <p className="text-center text-gray-400 text-base mt-10">
            😕 No se encontraron productos
          </p>
        )}

        {/* 🛒 GRID — ✅ 1 col en móvil muy pequeño, 2 col en móvil normal */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="relative group">
              <ProductCard producto={prod} />
              {user?.username === "admin" && (
                <>
                  <button
                    onClick={() => abrirEditar(prod)}
                    className="absolute top-2 right-12 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500/80 hover:bg-orange-400 text-white text-sm font-bold shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
                    title="Editar producto"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm font-bold shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Productos