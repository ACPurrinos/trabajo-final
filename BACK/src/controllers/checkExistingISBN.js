const { Producto, Categoria, Sequelize } = require("../DB_connection");

const checkExistingISBN = async (req, res) => {
  const { isbn } = req.query;
  console.log(isbn)

  // Check if ISBN is not provided
  if (!isbn) {
    return res.status(400).json({
      exists: false,
      message: 'ISBN is required.',
    });
  }

  try {
    const producto = await Producto.findOne({
      where: {
        ISBN: isbn,
      },
    });

    if (producto) {
        console.log(producto)
      res.status(200).json({
        exists: true,
        message: 'El libro ya existe en la Base de Datos.',
      });
    } else {
      res.status(200).json({
        exists: false,
        message: 'El libro no existe en la Base de Datos.',
      });
    }
  } catch (error) {
    console.error('Error al verificar la existencia del libro:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = checkExistingISBN;






// const { Producto, Categoria, Sequelize} = require("../DB_connection");

// const checkExistingISBN = async (req, res) => {
//     const { isbn } = req.query;
  
//     try {
//       const producto = await Producto.findOne({
//         where: {
//           ISBN: isbn
//         },
//       });
  
//       if (isbn) {
       
//         res.status(200).json({
//             exists: true,
//             message: 'El libro ya existe en la Base de Datos.',
//           });
    

//       } else {
     
//         res.status(200).json({
//           exists: false,
//           message: 'La categoría no existe.',
//         });
//       }
//     } catch (error) {
//       console.error('Error al verificar la existencia del libro:', error);
//       res.status(500).json({ message: 'Error interno del servidor.' });
//     }
//   };
  
//   module.exports = checkExistingISBN;