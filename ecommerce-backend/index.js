const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/productos", require("./routes/productos"))

app.listen(3001, () => {
  console.log("✅ Servidor corriendo en http://localhost:3001")
})