const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;

const usuarioRoutes = require('./routes/usuarios');


const mongoose = require("mongoose");
require('dotenv').config();

// Añadir esta línea para prepararte para el cambio en la versión 7 de Mongoose
mongoose.set('strictQuery', false);

app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON

//Gestión de las rutas usando el middleware
app.use('/api/usuarios', usuarioRoutes);


//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI + "/petfood", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));

//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});