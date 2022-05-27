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
app.use( cors() );

// Lectura/Parseo del Body (callAPI)!
app.use( express.json() );

// Base de Datos!
dbConnection();

// Rutas!
app.get( '/', (req, res) => {
    res//.status(400)
      .json( {
        ok: true,
        msg: 'Hola Mundo!'
      } );
  } );

app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );

app.listen(process.env.ADMINPRO_PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.ADMINPRO_PORT}!`);
  } );
