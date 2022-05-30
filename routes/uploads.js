/*
    Ruta: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, obtenerImagen } = require('../controllers/uploads');

const router = Router();
router.use( expressFileUpload() );

router.put( '/:tabla/:id', validarJWT, fileUpload );
router.get( '/:tabla/:imagen', obtenerImagen );

module.exports = router;
