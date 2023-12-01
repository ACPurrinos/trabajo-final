import React, { useContext, useState } from 'react';
import { CarritoContext } from '../../providers/carritoContext.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';





const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Navbar() {
  
const { isAuthenticated, user, logout } = useAuth0()

const signOut = () => {
  if (isAuthenticated) {
    logout()
  }
  else {
  localStorage.setItem("loggedIn", false)
  localStorage.setItem("userEmail", "")
  window.location.reload()
  }
}
  
const getUserData = () => {
 if (isAuthenticated) {
  return user.name
 }
 else return localStorage.getItem("userEmail")
}
  const { carrito, actualizarCantidad, removerDelCarrito, vaciarCarrito  } = useContext(CarritoContext);
  const [modalAbierto, setModalAbierto] = useState(false);

  const manejarAbrirModal = () => setModalAbierto(true);
  const manejarCerrarModal = () => setModalAbierto(false);

  const handleChangeCantidad = (productoId, nuevaCantidad) => {
    actualizarCantidad(productoId, nuevaCantidad);
  };

  const precioTotalGeneral = carrito.reduce((total, producto) => {
    return total + (producto.precio_$ * (producto.cantidad || 1));
  }, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#2196F3' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="Logo" />
          </IconButton>
         
          
         

    
  
          {/* <IconButton aria-label="cart"/>
           <StyledBadge badgeContent={5} color= "secondary" >
             <ShoppingCartIcon />
           </StyledBadge> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Los mejores libros
          </Typography>
          <Typography variant="h7" component="div" sx={{ textAlign: 'right' }}>
          {localStorage.getItem("loggedIn") === "true" || isAuthenticated ? 'Hola ' + getUserData() : 'Hola invitado'}
          </Typography> 
          {localStorage.getItem("loggedIn") === "true" || isAuthenticated ?
           <Button color='inherit' onClick={signOut}> Sign Out</Button> :
           <Link to={'/login'}><Button color="inherit" >Sign In</Button></Link>
        }
          <IconButton aria-label="cart" onClick={manejarAbrirModal}>
            <StyledBadge badgeContent={carrito.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Modal open={modalAbierto} onClose={manejarCerrarModal}>
        <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={manejarCerrarModal}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
          <Typography id="carrito-modal-titulo" variant="h6" component="h2">
            Carrito de Compras
          </Typography>
          {carrito.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Tu carrito está vacío.
            </Alert>
          )}
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {carrito.map((producto, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={producto.titulo}
                  secondary={`Precio Unitario: ${producto.precio_$}`}
                />
                <TextField
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={producto.cantidad || 1}
                  onChange={(e) => handleChangeCantidad(producto.id, parseInt(e.target.value, 10))}
                  sx={{ width: '90px', marginRight: '10px' }}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => removerDelCarrito(producto.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          {carrito.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: {precioTotalGeneral}
              </Typography>
              <Button variant="contained" color="primary" onClick={manejarCerrarModal}>
                Ir a pagar
              </Button>
              <Button variant="elevation={2}" color="secondary" onClick={vaciarCarrito} sx={{ marginLeft: '10px' }}>
                Vaciar Carrito
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
