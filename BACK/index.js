const server = require("./src/server");
const {sequelize}= require("./src/DB_connection");
require('dotenv').config();

sequelize.sync({alter:true})
.then(()=>{
    server.listen(3000, ()=>{
        console.log("Server listening on port 3000");
    });
}) 
.catch((err)=>console.log(err)); 


