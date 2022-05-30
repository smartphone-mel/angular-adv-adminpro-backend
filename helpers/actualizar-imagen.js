const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = (tabla, nombreArchivo) => {
    const pathViejo = `./uploads/${tabla}/${nombreArchivo}`;

    if ( fs.existsSync(pathViejo) )
        fs.unlinkSync(pathViejo);
}

const actualizarImagen = async (tabla, id, nombreArchivo) => {
    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if (!usuario)
                return false;

            borrarImagen(tabla, usuario.img);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if (!hospital)
                return false;

            borrarImagen(tabla, hospital.img);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'medicos':
            const medico = await Medico.findById(id);

            if (!medico)
                return false;

            borrarImagen(tabla, medico.img);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}
