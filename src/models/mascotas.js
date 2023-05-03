const mongoose = require('mongoose');

const horarioDeAlimentacionSchema = new mongoose.Schema({
  desde: { type: String, required: true },
  hasta: { type: String, required: true },
},{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
});

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  raza: { type: String, required: true },
  edad: { type: Number, required: true },
  horariosDeAlimentacion: [horarioDeAlimentacionSchema],
},{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
});

module.exports = mongoose.model('Mascota', mascotaSchema);