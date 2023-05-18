const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para crear un nuevo usuario
router.post('/crear', usuarioController.crearUsuario);
// Ruta para obtener un usuario por su ID
router.get('/:id', usuarioController.obtenerUsuario);
// Ruta para iniciar sesión
router.post('/iniciarsesion', usuarioController.iniciarSesion);

module.exports = router;