const { Sequelize, Op } = require("sequelize");
const { Producto, Categoria } = require("../DB_connection");
 
const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.query.toLowerCase();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const productos = await Producto.findAll({
            where: {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('UNACCENT', Sequelize.fn('LOWER', Sequelize.col('titulo'))), 'LIKE', `%${searchTerm.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('UNACCENT', Sequelize.fn('LOWER', Sequelize.col('autor'))), 'LIKE', `%${searchTerm.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('UNACCENT', Sequelize.fn('LOWER', Sequelize.col('ISBN'))), 'LIKE', `%${searchTerm.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('UNACCENT', Sequelize.fn('LOWER', Sequelize.col('editorial'))), 'LIKE', `%${searchTerm.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('UNACCENT', Sequelize.fn('LOWER', Sequelize.col('idioma'))), 'LIKE', `%${searchTerm.toLowerCase()}%`)
                ]
            },
            limit: limit,
            offset: offset
        });

        res.json(productos); 
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error.message);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message }); 
    }
};

module.exports = {
    searchProducts
};
