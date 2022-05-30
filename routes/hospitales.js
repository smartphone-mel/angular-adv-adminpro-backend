/*
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

router.get( '/', validarJWT, getHospitales);
router.post(
    '/',
    [ // Arreglo de Middlewares!
        validarJWT,
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        //check('img', 'La ruta del archivo es obligatoria.').not().isEmpty(),
        validarCampos,
    ],
    crearHospital
  );
router.put(
    '/:id',
    [ // Arreglo de Middlewares!
        validarJWT,
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        //check('img', 'La ruta del archivo es obligatoria.').not().isEmpty(),
        validarCampos,
    ],
    actualizarHospital
  );
router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;
