const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS abierto (para que Netlify pueda conectarse)
app.use(cors());

// ✅ Leer JSON
app.use(express.json());

// ✅ Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/productos", require("./routes/productos"));

// ✅ Puerto dinámico (IMPORTANTE para Railway)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo http://localhost:3001/api/productos`);
});