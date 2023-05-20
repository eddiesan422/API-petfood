const userCtrl = {};
const User = require("../models/User");

//Controllers
userCtrl.createUser = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  const savedUser = await newUser.save();
  res.json({
    status: "User saved",
  });
};

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.getUser = async (req, res) => {
  const { id } = req.params;
  const UserById = await User.findById(id);
  res.json(UserById);
};

userCtrl.receiveDetectionData = (req, res) => {
  const detectionData = req.body;
  console.log("Datos de detección recibidos:", detectionData[0].label);

  res
    .status(200)
    .json({ message: "Datos de detección recibidos correctamente" });
};

/*
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
*/

module.exports = userCtrl;
