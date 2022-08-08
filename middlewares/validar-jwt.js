const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Usuario = require('../models/usuario');

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

const validarADMIN_ROLE = async (req, res = response, next) => {
    try {
        const uid = req.uid;
        const usuario = await Usuario.findById(uid);

        if (!usuario)
            return res.status(401)
                .json( {
                    ok: false,
                    msg: 'Error al validar Rol de Usuario.'
                } );

        if (usuario.role !== 'ADMIN_ROLE')
            return res.status(403)
                .json( {
                    ok: false,
                    msg: 'Denegado.'
                } );
    } catch (eError) {
        return res.status(500)
            .json( {
                ok: false,
                msg: 'validarADMIN_ROLE() - Error!'
            } );
    }

    next();
}

const validarModificacionesUsuario = async (req, res = response, next) => {
    try {
        const uid = req.uid;
        const id = req.params.id;
        const usuario = await Usuario.findById(uid);

        if (!usuario)
            return res.status(401)
                .json( {
                    ok: false,
                    msg: 'Error al validar Rol de Usuario.'
                } );

        if (usuario.role !== 'ADMIN_ROLE' && uid !== id)
            return res.status(403)
                .json( {
                    ok: false,
                    msg: 'Denegado.'
                } );
    } catch (eError) {
        return res.status(500)
            .json( {
                ok: false,
                msg: 'validarADMIN_ROLE() - Error!'
            } );
    }

    next();
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarModificacionesUsuario
}
