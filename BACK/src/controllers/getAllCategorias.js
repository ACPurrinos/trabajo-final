const {Categoria} = require("../DB_connection");

// const getAllCategorias= async (req, res)=>{
//     try {
//          const categorias = await Categoria.findAll();
//     return res.status(200).json(categorias);
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
   
// };


const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    if (!categorias || categorias.length === 0) {
      return res.status(404).json({ message: "No se encontraron categorías." });
    }

    return res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = getAllCategorias;

