const { Producto, Categoria } = require("../DB_connection");
const { Op } = require("sequelize");

const findAllProductos = async (req, res) => {
    try {
        // Extraer los parámetros de categoría y precio de la solicitud
        const categoriaNombre = req.query.categoria;
        const precioMax = req.query.precio;

        // Condición inicial: incluir categoría en todas las consultas
        let condiciones = {
            include: [{
                model: Categoria,
                attributes: ["nombre"],
                through: { attributes: [] }
            }]
        };

        // Agregar condición de filtrado por categoría, si se proporciona
        if (categoriaNombre) {
            condiciones.include[0].where = { nombre: categoriaNombre };
        }

        // Agregar condición de filtrado por precio, si se proporciona
        if (precioMax) {
            condiciones.where = { 
                precio_$: { [Op.lte]: precioMax }
            };
        }

        // Realizar la consulta con las condiciones
        const productos = await Producto.findAll(condiciones);

        return res.status(200).json(productos);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


module.exports = findAllProductos; 