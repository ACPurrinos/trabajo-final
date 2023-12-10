import React, { useEffect, useState } from 'react'
import logo from '../../src/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { Google } from '@mui/icons-material'



const Login = () => {

  

  const { loginWithRedirect } = useAuth0()
  



const [errorMessage, setErrorMessage] = useState({
  message: ''
})
 const history = useNavigate()

  const [isSignedUp, setIsSignedUp] = useState(true)
  const handleLogin = (e) => {
    e.preventDefault()
    setIsSignedUp(!isSignedUp)
  }

  const [userData, setUserData] = useState({
    mail: "",
    password: "",
    rol: ""
  })

  
  const handleChange = (event) => {
    const property = event.target.name 
    const value = event.target.value
    setUserData({...userData, [property]:value})
  }
  
  
  const submit = (e) => {
      e.preventDefault()

      if(isSignedUp) { 
        fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
           mail: userData.mail,
           password: userData.password
         }),
      })
      .then((res) => res.json())
      .then((res) => {
       if (res === 'Faltan datos') {
        setErrorMessage({
          message: 'Todos los campos deben ser completados'
        })
       }
       else if (res === 'Datos incorrectos') {
         setErrorMessage({
          message: 'Los datos son incorrectos. Vuelva a intentarlo.'
         })
       }
     else { 
      localStorage.setItem("loggedIn", true)
      localStorage.setItem("userEmail", res.mail)
      history("/")
      window.location.reload()
      
    };
    })
    .catch((error) => console.log(error))
  }
    else {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
           mail: userData.mail,
           password: userData.password,
           rol: userData.rol
         }),
      })
      .then((res) => res.json())
      .then((res) => {
          if (res === 'Faltan datos') {
            setErrorMessage({
              message: 'Todos los campos deben ser completados'
            })
          }
          if (res === 'Registro exitoso') {
            history("/registroexitoso")
            window.location.reload()
          }
      })
      .catch((error) => console.log(error))
    }
      }
  


  return (
    <div>
      
      <form method={'post'}  onSubmit={submit}>
        
        <h1>{isSignedUp ? 'Login' : 'Sign Up'}</h1>
      
      {/* <input type='text' id='mail' name='mail' value={userData.mail} onChange={handleChange}></input> */}
      <TextField id="email" label="Email" variant="outlined" name='mail' value={userData.mail} onChange={handleChange}/>
      <br></br>
      <br></br>
      <TextField id="pass" label="Contraseña" variant="outlined" name='password' value={userData.password} onChange={handleChange}/>
      <br></br> 
      {!isSignedUp ? 
      <div>
        <label htmlFor='rol'> <h4>¿Es cliente o vendedor?</h4></label> 
      {/* <select name='rol' id='rol'>
        <option value={'cliente'}>Cliente</option>
        <option value={'admin'}>Administrador</option>
      </select> */}
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Elija su rol...</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name='rol'
          onChange={handleChange}
          value={userData.rol}
          label="Rol"
        >
          
          <MenuItem value={'cliente'}>Cliente</MenuItem>
          <MenuItem value={'admin'}>Vendedor</MenuItem>
          
        </Select>
        </FormControl>
      </div>
       
      : ''} 
      <h4>{errorMessage.message}</h4> <br></br>
      <Button variant='contained' type='submit' color='success'> Enviar</Button> <br></br> <br></br>
      <Button variant='outlined' startIcon={<Google/>} onClick={loginWithRedirect}> Ingresar con Google </Button>
      
      <h4>{isSignedUp ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</h4>
      
      <Button onClick={handleLogin} variant='contained'>{isSignedUp ? 'Registrarse' : 'Iniciar sesión'}</Button>
       
      </form>
      
    </div>
  )
}

export default Login