/*
    Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');

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

module.exports = router;
