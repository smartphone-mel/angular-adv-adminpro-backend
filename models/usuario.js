const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema( {
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
} );

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    // Oculto el Password del Model!
    object.uid = _id; // Cambio la visual del campo "_id" en get/set!
    return object;
} );

module.exports = model('Usuario', UsuarioSchema);
