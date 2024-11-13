const { Pokemon } = require('../baseDatos');

const registrarPokemon = async (req, res) => {
  try {
    const { nombre, tipo,poder} = req.body;
    
    const pokemonExistente = await Pokemon.findOne({
        where: {
            nombre: nombre
        }
    });

    if (pokemonExistente) {
      return res.status(400).json({ mensaje: "El pokemon ya existe",resultado:null });
    }

    const nuevoPokemon = await Pokemon.create({ nombre, tipo,poder });
    res.status(201).json({ mensaje:"Pokemon creado",resultado:nuevoPokemon});
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};

const listarPokemons = async (req, res) => {
  try{
    const Pokemons = await Pokemon.findAll();
    res.status(200).json({mensaje: "Pokemones encontrados", resultado: Pokemons});
  } catch (error){
    res.status(500).json({ mensaje: "Error de servidor, trata de nuevo mas tarde",resultado:null });
  }
}

module.exports = {
    registrarPokemon,
    listarPokemons
};