// const { Producto, Categoria } = require("../DB_connection");

// const checkExistingCategory = async (req, res) => {
//   const { nombre } = req.query;

//   try {
//     const categoria = await Categoria.findOne({
//       where: {
//         nombre: nombre,
//       },
//     });

//     if (categoria) {
//       // Si la categoría existe, devolver la información de la categoría
//       res.status(200).json({
//         exists: true,
//         categoria: {
//           id: categoria.id,
//           nombre: categoria.nombre,
//         },
//       });
//     } else {
//       // Si la categoría no existe
//       res.status(200).json({
//         exists: false,
//         message: 'La categoría no existe.',
//       });
//     }
//   } catch (error) {
//     console.error('Error al verificar la existencia de la categoría:', error);
//     res.status(500).json({ message: 'Error interno del servidor.' });
//   }
// };

// module.exports = checkExistingCategory;


const { Producto, Categoria, Sequelize} = require("../DB_connection");

const checkExistingCategory = async (req, res) => {
  const { nombre } = req.query;

  try {
    const categoria = await Categoria.findOne({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre // Op.iLike realiza una comparación insensible a mayúsculas y minúsculas
        },
      },
    });

    if (categoria) {
      // Si la categoría existe, devolver la información de la categoría
      res.status(200).json({
        exists: true,
        categoria: {
          id: categoria.id,
          nombre: categoria.nombre,
        },
      });
    } else {
      // Si la categoría no existe
      res.status(200).json({
        exists: false,
        message: 'La categoría no existe.',
      });
    }
  } catch (error) {
    console.error('Error al verificar la existencia de la categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = checkExistingCategory;
