const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req, res = response, next) => {
    // Leer el Token!
    const token = req.header('x-token');

    if (!token)
        return res.status(401)
            .json( {
                ok: false,
                msg: 'No hay un Token para validar acceso.'
            } );
    
    try {
        const { uid } = jwt.verify(token, process.env.ADMINPRO_JWT_SK);

        //console.log(`Token validado para uid: ${uid}!`);
        req.uid = uid;
    } catch (eError) {
        return res.status(401)
            .json( {
                ok: false,
                msg: 'Token inválido.'
            } );
    }

    next();
}

module.exports = {
    validarJWT
}
