const express = require('express');
const { Router } = require("express");
const findAllCategorias = require("./controllers/findAllCategorias");
const createCategoria = require("./controllers/createCategoria");
const createProducto = require("./controllers/createProducto");
const findAllProductos = require("./controllers/findAllProductos");
const getProductoById = require('./controllers/getProductoById');
const postUser = require('./controllers/postUser');
const checkLogin = require('./controllers/checkLogin');
const getCategorias = require('./controllers/categoriaController');
const searchController = require('./controllers/searchController');
const emailController = require('./controllers/emailController');
const mercadoPago = require("mercadopago"); // Importa MercadoPago

const router = Router();
router.use(express.json());

// Ruta para obtener todos los productos (incluyendo filtros y paginación)
router.get("/", findAllProductos);

// Ruta para crear un nuevo producto
router.post("/", createProducto);

// Ruta para registrarse
router.post("/signup", postUser);

// Ruta para validar login
router.post("/login", checkLogin);

// Ruta para obtener todas las categorías
router.get("/categoria", findAllCategorias);

// Ruta para crear una nueva categoría
router.post("/categoria", createCategoria);

// Ruta para obtener los detalles de un producto específico
router.get("/detail/:id", getProductoById);

// Ruta para obtener las categorías
router.get('/categorias', getCategorias);

// Ruta para la búsqueda de productos (con paginación)
router.get('/search', searchController.searchProducts);

// Ruta para manejar el envío del formulario de contacto
router.post('/enviar-formulario', emailController.procesarYEnviarFormulario);

// Rutas relacionadas con MercadoPago
router.post("/create_preference", (req, res) => {
    // Código relacionado con MercadoPago aquí
});

module.exports = router;
