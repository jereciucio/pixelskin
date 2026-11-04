const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/config');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/images/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/images/', req.params.image));
});

app.listen(config.port, () => {
    console.log(`Servidor iniciado en el puerto ${config.port}`);
    console.log(path.join(__dirname, '/public/index.html'));
});
