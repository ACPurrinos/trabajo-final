const { User }= require('../DB_connection')

const postUser = async (req, res) => {
    try {
        const { mail, password } = req.body
         console.log(req.body);

         if(!mail || !password) return res.status(400).json('Faltan datos')
         const user = await User.findOrCreate({ where: {mail: mail, password: password}})

         return res.status(200).json('Registro exitoso')
    } catch (error) {
       return  res.status(500).json(error.message)
    }


}

module.exports = postUser;