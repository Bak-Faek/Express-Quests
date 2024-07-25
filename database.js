require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: "localhost", // address of the server
  port: 3306, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: "root",
  password: "Banokfaek1989+",
  database: "express_quests",
});

database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

  database
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });

  module.exports = database;