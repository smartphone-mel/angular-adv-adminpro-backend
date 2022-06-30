/*
    Ruta: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, obtenerImagenDefault, obtenerImagen } = require('../controllers/uploads');

const router = Router();
router.use( expressFileUpload() );

router.put( '/:tabla/:id', validarJWT, fileUpload );
router.get( '/no-image-available', obtenerImagenDefault );
router.get( '/:tabla/:imagen', obtenerImagen );

module.exports = router;
