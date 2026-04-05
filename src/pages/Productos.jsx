import ProductCard from "../components/ProductoCard"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useProductos } from "../context/ProductosContext"

function Productos() {
  const { user } = useAuth()
  const { productos = [], agregarProducto, eliminarProducto, editarProducto } = useProductos()

  const [search, setSearch] = useState("")
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ nombre: "", precio: "", imagen: "" })
  const [exito, setExito] = useState(false)

  const [productoEditando, setProductoEditando] = useState(null)
  const [formEdit, setFormEdit] = useState({ nombre: "", precio: "", imagen: "" })

  const productosFiltrados = (productos || []).filter((prod) =>
    prod?.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleChangeEdit = (e) =>
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value })

  const handleAgregar = async () => {
    if (!form.nombre || !form.precio || !form.imagen) return

    await agregarProducto({
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
    setFormEdit({
      nombre: prod.nombre || "",
      precio: prod.precio || "",
      imagen: prod.imagen || "",
    })
  }

  const handleEditar = async () => {
    if (!formEdit.nombre || !formEdit.precio || !formEdit.imagen) return

    await editarProducto(productoEditando.id, {
      nombre: formEdit.nombre,
      precio: Number(formEdit.precio),
      imagen: formEdit.imagen,
    })

    setProductoEditando(null)
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] py-10 px-4 overflow-hidden">

      {/* 🔥 FONDO ORIGINAL */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-700/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 🔥 HEADER PRO */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white tracking-widest uppercase">
            Ecommerce ADSO
          </h2>
          <p className="text-orange-500 mt-2 tracking-wide">
            Catálogo de productos
          </p>
        </div>

        {/*  ADMIN */}
        {user?.username === "admin" && (
          <div className="mb-10 text-center">

            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-lg hover:scale-105 transition"
            >
              {mostrarForm ? "Cancelar" : "+ Agregar producto"}
            </button>

            {exito && (
              <div className="mt-4 text-green-400">
                ✅ Producto agregado correctamente
              </div>
            )}

            {mostrarForm && (
              <div className="mt-6 max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">

                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del producto"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/90 text-black"
                />

                <input
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  value={form.precio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/90 text-black"
                />

                <input
                  type="text"
                  name="imagen"
                  placeholder="URL de la imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/90 text-black"
                />

                {form.imagen && (
                  <img
                    src={form.imagen}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-xl"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

                <button
                  onClick={handleAgregar}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold"
                >
                  Guardar producto →
                </button>

              </div>
            )}
          </div>
        )}

        {/* 🔍 BUSCADOR PRO */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="🔎 Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-xl bg-white/90 text-black shadow-lg"
          />
        </div>

        {/*  LISTA */}
        {productosFiltrados.length === 0 ? (
          <p className="text-gray-400 text-center">
            No hay productos
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="relative group">

                <ProductCard producto={prod} />

                {user?.username === "admin" && (
                  <>
                    <button
                      onClick={() => abrirEditar(prod)}
                      className="absolute top-2 right-12 bg-orange-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => eliminarProducto(prod.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      X
                    </button>
                  </>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL EDITAR */}
      {productoEditando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-[#1a1a1a] p-6 rounded-2xl w-80 space-y-3 border border-white/10">

            <input
              type="text"
              name="nombre"
              value={formEdit.nombre}
              onChange={handleChangeEdit}
              className="w-full p-2 rounded bg-white text-black"
            />

            <input
              type="number"
              name="precio"
              value={formEdit.precio}
              onChange={handleChangeEdit}
              className="w-full p-2 rounded bg-white text-black"
            />

            <input
              type="text"
              name="imagen"
              value={formEdit.imagen}
              onChange={handleChangeEdit}
              className="w-full p-2 rounded bg-white text-black"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setProductoEditando(null)}
                className="bg-gray-500 px-3 py-1 text-white rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleEditar}
                className="bg-orange-500 px-3 py-1 text-white rounded"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Productos