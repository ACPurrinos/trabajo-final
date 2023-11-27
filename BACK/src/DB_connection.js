require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const modeloProducto = require("./models/Producto")
const mmodeloCategoria=require("./models/Categoria");
// const modeloUsuarioAdministrador = require("./models/UsuarioAdministrador");
// const modeloUsuario = require("./models/Usuario");
 

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   { logging: false, native: false }
);

modeloProducto(sequelize);
mmodeloCategoria(sequelize);
// modeloUsuarioAdministrador(sequelize);
// modeloUsuario(sequelize);

const{Producto, Categoria}= sequelize.models;
Producto.belongsToMany(Categoria, {through:"ProductoCategoria"});
Categoria.belongsToMany(Producto,{through:"ProductoCategoria"});



module.exports ={ 
   Producto,
   Categoria,
   // modeloUsuarioAdministrador,
   // modeloUsuario,
   
   sequelize, 
...sequelize.models,
};