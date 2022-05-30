const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res = response) => {
    try {
        const tiposValidos = ['usuarios', 'medicos', 'hospitales'],
            {tabla, id} = req.params;

        if ( !tiposValidos.includes(tabla) )
            return res.status(400)
                .json( {
                    ok: false,
                    msg: 'La Tabla es incorrecta.'
                } );

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400)
                .json( {
                    ok: false,
                    msg: 'No se encuentra el archivo a subir.'
                } );

        const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'],
            file = req.files.imagen,
            nombreCortado = file.name.split('.'),
            extensionArchivo = nombreCortado[nombreCortado.length - 1];

        if ( !extensionesValidas.includes(extensionArchivo) )
            return res.status(400)
                .json( {
                    ok: false,
                    msg: `Extensiones soportadas: ${extensionesValidas.join(', ')}.`
                } );

        const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`,
            uploadPath = `./uploads/${tabla}/${nombreArchivo}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (eError) => {
            if (eError) {
                console.error(eError);
                return res.status(500).json( {
                    ok: false,
                    msg: 'Error al subir el archivo.'
                  } );
            }

            // Actulizar la DB!
            actualizarImagen(tabla, id, nombreArchivo);

            res.json( {
                ok: true,
                msg: 'Archivo subido satisfactoriamente.',
                id, tabla, nombreArchivo
              } );
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'getTodo() - Error!'
            } );
    }
}

const obtenerImagen = async (req, res = response) => {
    try {
        const tiposValidos = ['usuarios', 'medicos', 'hospitales'],
            {tabla, imagen} = req.params;

        // De momento comento las Validaciones de Tabla!
        /*if ( !tiposValidos.includes(tabla) )
            return res.status(400)
                .json( {
                    ok: false,
                    msg: 'La Tabla es incorrecta.'
                } );*/

        let pathImagen = path.join(__dirname, `../uploads/${tabla}/${imagen}`);

        if ( !fs.existsSync(pathImagen) )
                pathImagen = path.join(__dirname, `../uploads/no-image-available.png`);

        res.sendFile(pathImagen);
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'obtenerImagen() - Error!'
            } );
    }
}

module.exports = {
    fileUpload,
    obtenerImagen
}
