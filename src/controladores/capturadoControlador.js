const { Capturado } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await Capturado.create(req.body);
    res.status(201).json({ mensaje: "Pokemon capturado",resultado:capturado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};

module.exports = {
    capturarPokemon
};