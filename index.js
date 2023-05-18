const express = require('express');
const conectarDB = require('./config/db');
const app = express();


// Conectar a la base de datos
conectarDB();
app.use(express.json({extended: true}));
app.use('/api/usuarios', require('./routes/usuario'));


app.listen(3000, () => console.log('Server corriendo en port 3000'));