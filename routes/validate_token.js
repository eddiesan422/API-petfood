const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized request');
    }

    const token = authHeader.substring(7); // Ignorar 'Bearer ' y obtener solo el token

    try {
        // Verificar y decodificar el token
        const payload = jwt.verify(token, process.env.SECRET);

        // Almacenar el ID de usuario en req.userId
        req.userId = payload.id;

        next();
    } catch (error) {
        // Manejar errores de verificación de token
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired');
        }

        // Otros posibles errores, como token inválido o firma incorrecta
        return res.status(401).send('Unauthorized request');
    }
};

module.exports = verifyToken;