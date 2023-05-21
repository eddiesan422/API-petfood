const express = require("express");
const router = express.Router();
const verifyToken = require('./validate_token');
const authentication= require('./authentication');
const userCtrl = require("../controllers/usuarioController");
const userLog = require("./authentication");

//Ruta para recibir los datos de detección desde el front
router.post('/detection', userCtrl.receiveDetectionData);

//Routes:
router.post('/create-user', userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.post('/login', userLog.login);

module.exports = router;
