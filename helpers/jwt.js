const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.ADMINPRO_JWT_SK, {
            expiresIn: '12h'
          }, (eError, token) => {
              if (eError) {
                  console.warn(eError);
                  reject(eError);
              } else {
                  resolve(token);
              }
          } );
      } );
}

module.exports = {
    generarJWT,
}
