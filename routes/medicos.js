/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get( '/', validarJWT, getMedicos);
router.post(
    '/',
    [ // Arreglo de Middlewares!
        validarJWT,
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        check('hospital', 'El Hospital es obligatorio.').not().isEmpty(),
        check('hospital', 'El Hospital debe tener un Id con formato correcto.').isMongoId(),
        //check('img', 'La ruta del archivo es obligatoria.').not().isEmpty(),
        validarCampos,
    ],
    crearMedico
  );
router.put(
    '/:id',
    [ // Arreglo de Middlewares!
        validarJWT,
        check('nombre', 'El Nombre es obligatorio.').not().isEmpty(),
        //check('img', 'La ruta del archivo es obligatoria.').not().isEmpty(),
        validarCampos,
    ],
    actualizarMedico
  );
router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;
