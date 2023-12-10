
const { Producto, Categoria, Sequelize} = require("../DB_connection");


    const deleteProduct = async (req, res) => {
        try {
          const productId = req.params.id; // Asegúrate de que estás obteniendo el ID del parámetro de la URL
          const deletedProductoCount = await Producto.destroy({
            where: {
              id: productId,
            },
          });
      
          if (deletedProductoCount > 0) {
            return res.status(200).json({ message: "Producto eliminado correctamente" });
          } else {
            return res.status(404).json({ message: "Producto no encontrado" });
          }
        } catch (error) {
          res.status(500).json(error.message);
        }
      };
      
      module.exports = {
    
        deleteProduct,
      };


module.exports = deleteProduct;