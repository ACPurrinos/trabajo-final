const {Producto, Categoria, Sequelize}=require("../DB_connection");




const getProductoYCategoriaById = async (req, res) => {
    const idRequerido = req.params.id;

    try {
        const productoEncontrado = await Producto.findOne({
            where: { id: idRequerido },
            include: Categoria, // Incluye la relación con la tabla Categoria
            // attributes: ['id', 'nombre'],
        });

        return res.status(200).json(productoEncontrado);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

module.exports = getProductoYCategoriaById;