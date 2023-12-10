require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const modeloProducto = require("./models/Producto")
const mmodeloCategoria=require("./models/Categoria");
const modeloUser = require('../src/models/User')
 

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   { logging: false, native: false }
);

modeloProducto(sequelize);
mmodeloCategoria(sequelize);
modeloUser(sequelize);


const{Producto, Categoria, User}= sequelize.models;
Producto.belongsToMany(Categoria, {through:"ProductoCategoria"});
Categoria.belongsToMany(Producto,{through:"ProductoCategoria"});



module.exports ={
   Producto,
   Categoria,
   User,
   sequelize, 
...sequelize.models,
Sequelize
};