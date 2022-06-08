const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.ADMINPRO_GOOGLE_ID);

const googleVerify = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.ADMINPRO_GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      } ),
      payload = ticket.getPayload(),
      //userid = payload['sub'],
      { name, email, picture } = payload;

    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return { name, email, picture, error: null };
  } catch (eError) {
    return { name: '', email: '', picture: '', error: eError };
  }
}

module.exports = {
    googleVerify
}
