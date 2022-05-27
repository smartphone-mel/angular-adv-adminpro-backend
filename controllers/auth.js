const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'login() - Error!'
            } );
    }
}

module.exports = {
    login,
}
