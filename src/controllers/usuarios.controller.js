//Este archivo ayudará a tener la lógica de las peticiones en funciones.
const usuario = require("../models/usuarios");
const usuarioCtrl = {};

usuarioCtrl.crearUsuario = async (req, res) => {
  const usuarioCreado = new usuario(req.body);
  await usuarioCreado.save();
  res.send({
    status: "Usuario guardado.",
  });
};

usuarioCtrl.obtenerUsuarios = async (req, res) => {
  const usuarios = await usuario.find();
  res.json(usuarios);
};

usuarioCtrl.obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  const usuarioById = await usuario.findById(id);
  res.json(usuarioById);
};

usuarioCtrl.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuarioActualizar = {
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    password: req.body.password,
  };
  await usuario.findByIdAndUpdate(id, { $set: usuarioActualizar });
  res.json({ status: "Usuario actualizado." });
};

usuarioCtrl.borrarUsuario = async (req, res) => {
  const { id } = req.params;
  await usuario.findByIdAndDelete(id);
  res.send("Usuario eliminado.");
};

module.exports = usuarioCtrl;
