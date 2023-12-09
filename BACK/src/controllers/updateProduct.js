

const { Producto, Categoria } = require("../DB_connection");

const updateProduct = async (req, res) => {
  const idRequerido = req.params.id;

  try {
    const productoEncontrado = await Producto.findOne({
      where: { id: idRequerido },
      include: [Categoria], // Incluye la categoría asociada
    });

    if (!productoEncontrado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar solo los campos proporcionados en la solicitud (si existen)
    await productoEncontrado.update(req.body);

    // Si hay una categoría en la solicitud, actualiza la categoría asociada al producto
    if (req.body.categoria) {
        await productoEncontrado.setCategoria(req.body.categoria, { through: 'ProductoCategoria' });
    }

    return res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProduct;



// const { Producto, Sequelize } = require("../DB_connection");

// const updateProduct = async (req, res) => {
//     const idRequerido = req.params.id;
   
//     try {
//         const productoEncontrado = await Producto.findOne({
//             where: { id: idRequerido }
//         });

//         if (!productoEncontrado) {
//             return res.status(404).json({ error: 'Producto no encontrado' });
//         }

//         // Actualizar los campos necesarios con los datos proporcionados en la solicitud
//         await productoEncontrado.update(req.body);

//         return res.status(200).json({ message: 'Producto actualizado correctamente' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const { Producto, Sequelize } = require("../DB_connection");

// const updateProduct = async (req, res) => {
//     const idRequerido = req.params.id;
   
//     try {
//         const productoEncontrado = await Producto.findOne({
//             where: { id: idRequerido }
//         });

//         if (!productoEncontrado) {
//             return res.status(404).json({ error: 'Producto no encontrado' });
//         }

//         // Actualizar solo los campos proporcionados en la solicitud (si existen)
//         await productoEncontrado.update(req.body);

      
//         return res.status(200).json({ message: 'Producto actualizado correctamente' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = updateProduct;
