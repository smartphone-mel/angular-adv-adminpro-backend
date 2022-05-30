const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    try {
        /*const medicos = await Medico.find( {}, 'nombre img hospital usuario' );*/
        const medicos = await Medico.find()
            .populate('hospital', 'nombre')
            .populate('usuario', 'nombre apellido');

        res.json( {
            ok: true,
            medicos
        } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'getMedicos() - Error!'
            } );
    }
};

const crearMedico = async (req, res = response) => {
    try {
        const medico = new Medico( {
            usuario: req.uid,
            ...req.body
          } );
    
        await medico.save();

        // TODO: Validar Token y comprobar Usuario correcto!
    
        res.json( {
            ok: true,
            medico
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'crearMedico() - Error!'
            } );
    }
};

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById( id );

        if (!medicoDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Médico id=${id}.`
                } );

        // TODO: Validar Token y comprobar Usuario correcto!

        // Actualizaciones!
        const campos = req.body;
        //const medicoActualizado = await Medico.findByIdAndUpdate(id, campos, { new: true } );

        res.json( {
            ok: true,
            msg: "Médico actualizado satisfactoriamente.",
            id
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'actualizarMedico() - Error!'
            } );
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById( id );

        if (!medicoDB)
            return res.status(404)
                .json( {
                    ok: false,
                    msg: `No se encuentra el Médico id=${id}.`
                } );

        // TODO: Validar Token y comprobar Usuario correcto!

        //await Medico.findByIdAndDelete(id);

        res.json( {
            ok: true,
            msg: "Médico borrado satisfactoriamente.",
            id
          } );
    } catch (eError) {
        console.error(eError);
        res.status(500)
            .json( {
                ok: false,
                msg: 'borrarMedico() - Error!'
            } );
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
