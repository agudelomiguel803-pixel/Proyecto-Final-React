const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "nozomi.proxy.rlwy.net",
  user: "root",
  password: "YgZYxnEAWoalYveqSROGTexnHmohDOrr",
  database: "railway",
  port: 22709
});

// (Opcional) probar conexión
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Conectado a MySQL 🚀");
    connection.release();
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  }
})();

module.exports = db;