const { Capturado } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await Capturado.create(req.body);
    res.status(201).json({ mensaje: "Pokemon capturado",resultado:capturado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};

const listarCapturados = async (req, res) => {
  try{
    const capturados = await Capturado.findAll();
    res.status(200).json({mensaje: "Capturados encontrados", resultado: capturados});
  } catch (error){
    res.status(400).json({ mensaje: "Error en servidor, trata de nuevo mas tarde",resultado:null });
  }
}

module.exports = {
    capturarPokemon,
    listarCapturados
};