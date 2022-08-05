const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res) => {
    try {
        /*const hospitales = await Hospital.find( {}, 'nombre img usuario' );*/
        const hospitales = await Hospital.find()
            .populate('usuario', 'nombre apellido img');

        res.json( {
            ok: true,
            hospitales
        } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'getHospitales() - Error!'
            } );
    }
};

const crearHospital = async (req, res = response) => {
    try {
        const hospital = new Hospital( {
            usuario: req.uid,
            ...req.body
          } );
    
        await hospital.save();
    
        res.json( {
            ok: true,
            hospital
          } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'crearHospital() - Error!'
            } );
    }
};

const actualizarHospital = async (req, res = response) => {
    try {
        const id = req.params.id,
            uid = req.uid;
        const hospitalDB = await Hospital.findById( id );

        if (!hospitalDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Hospital id=${id}.`
                } );

        // Actualizaciones!
        const campos = { ...req.body, uid };
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, campos, { new: true } );

        res.json( {
            ok: true,
            msg: "Hospital actualizado satisfactoriamente.",
            id
          } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'actualizarHospital() - Error!'
            } );
    }
}

const borrarHospital = async (req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( id );

        if (!hospitalDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Hospital id=${id}.`
                } );

        await Hospital.findByIdAndDelete(id);

        res.json( {
            ok: true,
            msg: "Hospital borrado satisfactoriamente.",
            id
          } );
    } catch (eError) {
        console.warn(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'borrarHospital() - Error!'
            } );
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
