const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); //Un middleware che analizza i cookie inviati dal client al server.
const cors = require('cors'); //Un middleware che gestisce il Cross-Origin Resource Sharing, permettendo ad applicazioni in altri domini di comunicare con il server.

// create a database connection
// create a separate file for this and then import/use that

mongoose.connect(URI_MONGO).then(()=>console.log('MongoDB Connected')).catch((error)=> console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use( //Metodo per aggiungere middleware all'applicazione
    cors({}) //Aggiunge il supporto per le richieste Cross-Origin. L'oggetto vuoto {} indica che tutte le origini sono permesse.
)