const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        
        const usuarioDB = await Usuario.findOne( { email } );

        if (!usuarioDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: 'La Password es incorrecta.'
                } );

        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if (!validPassword)
            return res.status(400)
                .json( {
                    ok: false,
                    msg: 'La Password es incorrecta.'
                } );

        // Generar el Token (JWT)!
        const token = await generarJWT(usuarioDB.id);

        res.json( {
                ok: true,
                token
            } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'login() - Error!'
            } );
    }
}

const loginGoogle = async (req, res = response) => {
    try {
        const { token } = req.body;

        // Descontinuado!!!
        // NOTA: puedo checkear si existe el email en la tabla 'usuarios', y agregarlo o validar acceso!
        /*const { name, email, picture } = await googleVerify(token).catch( (eError) => {
            return res.status(401)
                .json( {
                    ok: false,
                    msg: 'Token inválido.'
                } );
          } );*/

        res.json( {
            ok: true,
            token // { name, email, picture }
        } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'loginGoogle() - Error!'
            } );
    }
}

const renew = async (req, res = response) => {
    try {
        const uid = req.uid;

        // Generar el Token (JWT)!
        const token = await generarJWT(uid);

        res.json( {
            ok: true,
            token
        } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'renew() - Error!'
            } );
    }
}

module.exports = {
    login,
    loginGoogle,
    renew
}
