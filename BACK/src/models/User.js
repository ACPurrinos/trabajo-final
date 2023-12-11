const {DataTypes}=require('sequelize');


module.exports=(sequelize)=>{
    sequelize.define("User",{
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        mail:{type:DataTypes.STRING(60)},
        password:{type:DataTypes.STRING(50)},
        rol: { type: DataTypes.STRING(20)}
        


},
{timestamps:false,
}
)};