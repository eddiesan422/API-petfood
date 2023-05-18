const Usuario = require('../models/Usuario');

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud

    // Buscar el usuario en la base de datos por correo electrónico
    const user = await Usuario.findOne({ email });

    if (!user) {
      console.log("El usuario no existe");
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Verificar la contraseña
    if (user.password !== password) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    console.log("Inicio de sesión exitoso:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    // Obtener los datos del usuario desde el cuerpo de la solicitud (req.body)
    const userData = req.body;

    // Crear una instancia del modelo Usuario con los datos proporcionados
    const nuevoUsuario = new Usuario(userData);

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();

    console.log("Usuario registrado exitosamente:", usuarioGuardado);
    return res.status(200).json(usuarioGuardado);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};
