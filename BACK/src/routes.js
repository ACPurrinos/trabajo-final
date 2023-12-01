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

const router = Router();
router.use(express.json()); 
 
// Ruta para obtener todos los productos (incluyendo filtros y paginación)
router.get("/", findAllProductos);

// Ruta para crear un nuevo producto
router.post("/", createProducto);

// Ruta para registrarse
router.post("/signup", postUser);

// Ruta para validar login
router.post("/login", checkLogin)

// Ruta para obtener todas las categorías
router.get("/categoria", findAllCategorias);

// Ruta para crear una nueva categoría
router.post("/categoria", createCategoria);

// Ruta para obtener los detalles de un producto específico
router.get("/detail/:id", getProductoById);

// Ruta para obtener las categorías (puede que sea similar a 'findAllCategorias', verificar si es necesario mantener ambas)
router.get('/categorias', getCategorias);

// Ruta para la búsqueda de productos (con paginación)
router.get('/search', searchController.searchProducts);

module.exports = router;