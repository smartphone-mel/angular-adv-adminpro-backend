const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.ADMINPRO_DB_CONNECTION_STRING,
            {
                // Deprecated!
                /*useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true*/
            } );
        
        console.log('MongoDB conectado!');
    } catch (eError) {
        console.error(eError);
        throw new Error('Error a la hora de conectarse al MongoDB.');
    }
}

module.exports = {
    dbConnection
}
