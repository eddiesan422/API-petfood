const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true },
  password: { type: String, required: true },
},{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
});

module.exports = mongoose.model('usuarios', usuariosSchema);