const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');

// Endpoint para registrar un usuario
router.post('/registro', async (req, res) => {
  const { nombres, apellidos, correo, password } = req.body;

  try {
    // Creamos un nuevo usuario con los datos recibidos
    const usuario = new Usuario({ nombres, apellidos, correo, password });

    // Guardamos el usuario en la base de datos
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar el usuario', error });
  }
});

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscamos el usuario en la base de datos por su correo y contraseña
    const usuario = await Usuario.findOne({ correo, password });

    if (!usuario) {
      // Si el usuario no existe o las credenciales son incorrectas, respondemos con un error
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    } else {
      // Si el usuario existe y las credenciales son correctas, respondemos con los datos del usuario
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al iniciar sesión', error });
  }
});

// Endpoint para modificar la información del usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, correo, password } = req.body;

  try {
    // Buscamos y actualizamos el usuario en la base de datos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombres, apellidos, correo, password },
      { new: true }
    );

    if (!usuarioActualizado) {
      // Si el usuario no existe, respondemos con un error
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      // Si el usuario se actualizó correctamente, respondemos con los datos del usuario actualizados
      res.status(200).json(usuarioActualizado);
    }
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al modificar la información del usuario', error });
  }
});
// Endpoint para obtener todos los usuarios
router.get('/obtener', async (req, res) => {
    try {
      // Buscamos todos los usuarios en la base de datos
      const usuarios = await Usuario.find();
  
      // Si no hay usuarios, respondemos con un mensaje de error
      if (usuarios.length === 0) {
        res.status(404).json({ mensaje: 'No se encontraron usuarios' });
      } else {
        // Si hay usuarios, respondemos con los datos de todos los usuarios
        res.status(200).json(usuarios);
      }
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al obtener los usuarios', error });
    }
  });
module.exports = router;