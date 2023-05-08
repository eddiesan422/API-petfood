const express = require("express");
const router = express.Router();
const usuarioCtrl = require("../controllers/usuarios.controller");

router.get("/", usuarioCtrl.obtenerUsuarios);

router.post("/", usuarioCtrl.crearUsuario);

router.get("/:id", usuarioCtrl.obtenerUsuario);

router.put("/:id", usuarioCtrl.actualizarUsuario);

router.delete("/:id", usuarioCtrl.borrarUsuario);

module.exports = router;
