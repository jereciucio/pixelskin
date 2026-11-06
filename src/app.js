const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/config');

// Conectar a la base de datos
const connectDB = require('./config/db');
connectDB();

app.use(express.json());


// Definir rutas
const tagRouter = require("./routes/tagRoute");
app.use("/api/tags",tagRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/images/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/images/', req.params.image));
});


// Usar el errorHandler personalizado
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Servidor iniciado en el puerto ${config.port}`);
    console.log(path.join(__dirname, '/public/index.html'));
});
