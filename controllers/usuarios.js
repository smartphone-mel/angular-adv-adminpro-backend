const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    /*const usuarios = await Usuario.find( {}, 'nombre apellido email role google' );*/
    const usuarios = await Usuario.find();

    res.json( {
        ok: true,
        usuarios,
        uid: req.uid
      } );
};

const crearUsuario = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        
        const existeEmail = await Usuario.findOne( { email } );

        if (existeEmail)
            return res.status(400)
                .json( {
                    ok: false,
                    msg: 'El Email no puede duplicarse.'
                } );

        const usuario = new Usuario(
            req.body
        );

        // Encriptar Password!
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
    
        await usuario.save();

        // Generar el Token (JWT)!
        const token = await generarJWT(usuario.id);
    
        res.json( {
            ok: true,
            usuario,
            token
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'crearUsuario() - Error!'
            } );
    }
};

const actualizarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Usuario uid=${uid}.`
                } );

        // TODO: Validar Token y comprobar Usuario correcto!

        // Actualizaciones!
        const { password, google, email, ...campos} = req.body;
        //delete campos.email;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne( { email: req.body.email } );

            if (existeEmail)
                return res.status(400)
                    .json( {
                        ok: false,
                        msg: 'El Email no puede duplicarse.'
                    } );
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true } );

        res.json( {
            ok: true,
            msg: "Usuario actualizado satisfactoriamente.",
            uid
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'actualizarUsuario() - Error!'
            } );
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Usuario uid=${uid}.`
                } );

        // TODO: Validar Token y comprobar Usuario correcto!

        await Usuario.findByIdAndDelete(uid);

        res.json( {
            ok: true,
            msg: "Usuario borrado satisfactoriamente.",
            uid
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'borrarUsuario() - Error!'
            } );
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
