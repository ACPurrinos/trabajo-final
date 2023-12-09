const express = require('express');
const {Router}=require("express");
const sequelize = require("./DB_connection");
const findAllCategorias = require("./controllers/findAllCategorias");
const createCategoria = require("./controllers/createCategoria");
const createProducto = require("./controllers/createProducto");
const findAllProductos = require("./controllers/findAllProductos");
const getProductoById = require('./controllers/getProductoById');
const getAllCategorias = require('./controllers/getAllCategorias')
const checkExistingCategory = require('./controllers/checkExistingCategory');
const checkExistingISBN = require('./controllers/checkExistingISBN');
const deleteProduct = require('./controllers/deleteProduct');
const updateProduct = require("./controllers/updateProduct");
const getProductoYCategoriaById = require('./controllers/getProductoYCategoriaById')

const router = Router();
router.use(express.json());


router.get("/", findAllProductos);

router.post("/", createProducto);

router.get("/categoria", findAllCategorias);

router.post("/categoria", createCategoria);

router.get("/detail/:id", getProductoById);

router.get("/producto-y-categoria-por-ID/:id", getProductoYCategoriaById)

router.get("/categorias-buscar-todas", getAllCategorias );

router.get("/categorias/check", checkExistingCategory);

router.get("/producto/check", checkExistingISBN);

router.delete("/producto-delete/:id", deleteProduct);

router.patch("/editar-producto/:id", updateProduct);

router.get("/buscar-por-titulo", )

module.exports = router;