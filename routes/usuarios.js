/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();

router.get( '/', validarJWT, getUsuarios);
router.post(
    '/',
    [ // Arreglo de Middlewares!
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        check('apellido', 'El Apellido es obligatorio.').not().isEmpty(),
        check('email', 'El Email (con formato correcto) es obligatorio.').isEmail(),
        check('password', 'La Password es obligatoria.').not().isEmpty(),
        validarCampos,
    ],
    crearUsuario
  );
router.put(
    '/:id',
    [ // Arreglo de Middlewares!
        validarJWT,
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        check('apellido', 'El Apellido es obligatorio.').not().isEmpty(),
        check('email', 'El Email (con formato correcto) es obligatorio.').isEmail(),
        check('role', 'El Rol de Usuario es obligatorio.').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
  );
router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;
