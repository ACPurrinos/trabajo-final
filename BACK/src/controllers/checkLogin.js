const {User} = require('../DB_connection')
const { Op } =require('sequelize');



const checkLogin = async (req, res) => {

    try {
        const { mail, password } = req.body;

if (!mail || !password) return res.status(400).json('Faltan datos')

const user = await User.findOne({where: {
    [Op.and]: [
      { mail: mail },
      { password: password }
    ]
  }})

  if (!user) return res.status(401).json('Datos incorrectos')

  return res.status(200).json(user)
    } 
    catch (error) {
        res.status(500).json(error.message)
    }


}


module.exports = checkLogin