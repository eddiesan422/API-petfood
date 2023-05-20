const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/usuarioController");

//Ruta para recibir los datos de detección desde el front
router.post('/detection', userCtrl.receiveDetectionData);

//Routes:
router.post('/create-user', userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);

/*
// Ruta para iniciar sesión
router.post('/iniciarsesion', userCtrl.iniciarSesion);
*/

module.exports = router;
