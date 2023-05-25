const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, process.env.SECRET);

    req.userId = payload._id;
    console.log(payload.id);
    next();

};

module.exports = verifyToken;