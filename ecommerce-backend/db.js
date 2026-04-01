const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce_adso",
})

module.exports = pool.promise()