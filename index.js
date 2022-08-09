const express = require('express');
const cors = require('cors');
const path = require('path');
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

// Directorio public (levantar la webPage de ese directorio)!
app.use( express.static('public') );

// Rutas!
app.get( '/api', (req, res) => {
    res//.status(400)
      .json( {
        ok: true,
        msg: 'Bienvenidos al Backend WebAPI de AdminPro!'
      } );
  } );

app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/uploads', require('./routes/uploads') );
app.use('/api/login', require('./routes/auth') );

// Para prod.
app.get( '*', (req, res) => {
  res.sendFile( path.resolve(__dirname, 'public/index.html') );
} );

app.listen(process.env.ADMINPRO_PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.ADMINPRO_PORT}!`);
  } );
