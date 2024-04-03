const express = require('express');
const app = express ('app');
require ('dotenv').config();
const contactRouter = require('./controllers/contact');
const {MONGO_URI} = require("./config");
const expressStaticGzip = require('express-static-gzip');
const path = require ('path');



//rutas backend
app.use(express.json())
app.use('/api/contact', contactRouter);

app.use(expressStaticGzip(path.join(__dirname, 'dist')));
app.get('/*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;