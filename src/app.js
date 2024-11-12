require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const usuarioRutas = require('./rutas/rutasUsuarios');
const pokemonRutas = require('./rutas/rutasPokemon');
const capturaRutas = require('./rutas/rutasCapturados');

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'vistas')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'menu.html'));
});

app.use('/api/usuario', usuarioRutas);
app.use('/api/pokemon', pokemonRutas);
app.use('/api/captura', capturaRutas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});