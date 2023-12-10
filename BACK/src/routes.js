const express = require('express');
const { Router } = require("express");
const findAllCategorias = require("./controllers/findAllCategorias");
const createCategoria = require("./controllers/createCategoria");
const createProducto = require("./controllers/createProducto");
const findAllProductos = require("./controllers/findAllProductos");
const getProductoById = require('./controllers/getProductoById');
// const bodyParser =require('body-parser');
const router = Router();
router.use(express.json());
// router.use(bodyParser.json());

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

module.exports = router;
