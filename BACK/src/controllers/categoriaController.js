const { Categoria } = require("../DB_connection");

const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = getCategorias;