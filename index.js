const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//console.log('Hola Mundo!');
/*console.log('. process.env: '),
  console.log(process.env);*/

// Crear el Servidor de Express!
const app = express();

// Configurar CORS!
app.use(cors())

// Base de Datos!
dbConnection();

// Rutas!
app.get( '/', (req, res) => {
    res//.status(400)
      .json({
        ok: true,
        msj: 'Hola Mundo!'
      } );
  } );

app.listen(process.env.ADMINPRO_PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.ADMINPRO_PORT}!`);
  } );
