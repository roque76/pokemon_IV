require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const usuarioRutas = require('./rutas/rutasUsuarios');
const pokemonRutas = require('./rutas/rutasPokemon');
const capturaRutas = require('./rutas/rutasCapturados');

app.use(express.json());
app.use(cors());

app.use('/api/usuario', usuarioRutas);
app.use('/api/pokemon', pokemonRutas);
app.use('/api/captura', capturaRutas);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});