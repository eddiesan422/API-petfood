const express = require("express");
const morgan = require("morgan");
//Pedimos la conexión a la base de datos
const { mongoose } = require("./database");
const app = express();

/*
Configuraciones del servidor
*/
app.set("port", process.env.port || 3000);

/* Middlewares: Conversores de datos */
//Morgan para ver las peticiones que recibimos
app.use(morgan("dev"));
//express.json para entender archivos json
app.use(express.json());

/* 
Rutas 
*/
app.use("/api/usuarios", require("./routes/usuarios.routes"));

/*
Inicianco el servidor
*/
app.listen(app.get("port"), () => {
  console.log("Server listen on port: ", app.get("port"));
});
