const express = require('express');
const app = express();
const path = require('path');
const port = 8080;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/images/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/images/', req.params.image));
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log(path.join(__dirname, '/public/index.html'));
});
