const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usuarioRouter = require('./rutas/usuario');
const abogadoRouter = require('./rutas/abogados');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
mongoose.set("strictQuery", false);
const http = require('http');

const corsOptions = {
  origin: process.env.URL_API,
};

app.use(cors(corsOptions));
app.use('/usuario', usuarioRouter);
app.use('/abogado',abogadoRouter);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).send('Error interno del servidor');
});

const server = http.createServer(app);

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error de conexión a MongoDB:\n', error);
  });

  db.once('open', () => {
    console.log('Conexión a MongoDB exitosa');
  });

  const io = require('socket.io')(server, { cors: corsOptions });

  const generarNombreSala = (idUsuario1, idUsuario2) => {
    const usuariosOrdenados = [idUsuario1, idUsuario2].sort();
    return usuariosOrdenados.join('_');
  };

  io.on('connection', (socket) => {

    socket.on('usuario_conectado', ({ userId }) => {
        socket.userId = userId;
        console.log(socket.userId);
        io.emit('confirmar_chat', socket.userId);
    });

    socket.on('enviar_mensaje', (data) => {
        const nombreSala = generarNombreSala(socket.userId, data.idUsuarioReceptor);
        io.emit('enviar_mensaje', data);
        socket.to(nombreSala).emit('enviar_mensaje', data);
    });

    /* socket.on("message", (data) => {
        io.emit("activar_chat_respuesta", { adminId: data.idUsuarioReceptor });
    }); */
});

  
server.listen(process.env.PORT || 9000, () => {
  console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`);
});