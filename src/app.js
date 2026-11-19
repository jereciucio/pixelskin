const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/config');

// Conectar a la base de datos
const connectDB = require('./config/db');
connectDB();

app.use(express.json());


// Hacer que express no cachee respuestas, ya que si no al devolver
// posts tiraba un 304 en vez de 200
app.set("etag", false);

// Definir rutas
const tagRouter = require("./routes/tagRoute");
app.use("/api/tags",tagRouter);

const postRouter = require("./routes/postRoute");
app.use("/api/posts",postRouter);

const userRouter = require("./routes/userRoute");
app.use("/api/users",userRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/images/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/images/', req.params.image));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/style.css'));
});

app.get('/components/:script' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public/components/', req.params.script));
})

app.get('/skin/:skin',(req, res) => {
    res.sendFile(path.join(__dirname,'public/skin.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/upload.html'));
});

// Usar el errorHandler personalizado
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Servidor iniciado en el puerto ${config.port}`);
    console.log(path.join(__dirname, '/public/index.html'));
});
