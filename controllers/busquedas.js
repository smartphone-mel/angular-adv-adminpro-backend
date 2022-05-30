const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async (req, res = response) => {
    try {
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');

        const [usuarios, hospitales, medicos] =
            await Promise.all( [
                Usuario.find( {
                    $or: [
                        { nombre: regex },
                        { apellido: regex },
                        { email: regex }
                      ]
                  } ),
                Hospital.find( {
                    nombre: regex
                  } ),
                Medico.find( {
                    nombre: regex
                  } )
            ] );

        res.json( {
            ok: true,
            usuarios,
            hospitales,
            medicos
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

const getDocumentosColeccion = async (req, res = response) => {
    try {
        const {tabla, busqueda} = req.params;
        const regex = new RegExp(busqueda, 'i');
        let resultado = [];

        switch (tabla) {
            case 'usuarios':
                resultado = await Usuario.find( {
                    $or: [
                        { nombre: regex },
                        { apellido: regex },
                        { email: regex }
                      ]
                  } );
                break;
            case 'hospitales':
                resultado = await Hospital.find( {
                    nombre: regex
                  } );
                break;
            case 'medicos':
                resultado = await Medico.find( {
                    nombre: regex
                  } );
                break;
            default:
                return res.status(400)
                    .json( {
                        ok: false,
                        msg: 'La Tabla es incorrecta.'
                    } );
                break;
        }

        res.json( {
            ok: true,
            resultado
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

module.exports = {
    getTodo,
    getDocumentosColeccion
}
