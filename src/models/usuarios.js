const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("usuarios", usuariosSchema);
