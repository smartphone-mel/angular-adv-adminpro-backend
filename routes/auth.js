/*
    Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, loginGoogle, renew } = require('../controllers/auth');

const router = Router();

router.post(
    '/',
    [ // Arreglo de Middlewares!
        check('email', 'El Email (con formato correcto) es obligatorio.').isEmail(),
        check('password', 'La Password es obligatoria.').not().isEmpty(),
        validarCampos
    ],
    login
  );

router.post(
    '/google',
    [ // Arreglo de Middlewares!
        check('token', 'No hay un Token para validar acceso.').not().isEmpty(),
        validarCampos
    ],
    loginGoogle
  );

router.get(
    '/renew',
    validarJWT,
    renew
  );

module.exports = router;
