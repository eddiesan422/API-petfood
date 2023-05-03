const express = require('express');
const router = express.Router();
const Mascota = require('../models/mascotas');

// Obtener todas las mascotas de un usuario
router.get('/:id_usuario', async (req, res) => {
  try {
    const mascotas = await Mascota.find({ usuario: req.params.id_usuario });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una mascota específica
router.get('/mascotas/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva mascota
router.post('/crear', async (req, res) => {
  const mascota = new Mascota({
    nombre: req.body.nombre,
    raza: req.body.raza,
    edad: req.body.edad,
    horariosAlimentacion: req.body.horariosAlimentacion,
    usuario: req.body.usuario,
  });

  try {
    const nuevaMascota = await mascota.save();
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una mascota
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    mascota.nombre = req.body.nombre || mascota.nombre;
    mascota.raza = req.body.raza || mascota.raza;
    mascota.edad = req.body.edad || mascota.edad;
    mascota.horariosAlimentacion = req.body.horariosAlimentacion || mascota.horariosAlimentacion;

    const mascotaActualizada = await mascota.save();
    res.json(mascotaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una mascota
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    await mascota.remove();
    res.json({ message: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;