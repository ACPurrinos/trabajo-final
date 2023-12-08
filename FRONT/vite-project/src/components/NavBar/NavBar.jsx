import React, { useContext, useState } from 'react';
import { CarritoContext } from '../../providers/carritoContext.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import PasarelaDePago from '../Pasarela de pago/PasarelaDePago.jsx';
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";


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
  const { isAuthenticated, user, logout } = useAuth0();
  const { carrito, actualizarCantidad, removerDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const [modalCarritoAbierto, setModalCarritoAbierto] = useState(false);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [mostrarBotonMercadoPago, setMostrarBotonMercadoPago] = useState(false);
  const manejarAbrirModalCarrito = () => setModalCarritoAbierto(true);
  const manejarCerrarModalCarrito = () => setModalCarritoAbierto(false);
  const manejarAbrirModalPago = () => {
    setModalCarritoAbierto(false);
    setModalPagoAbierto(true);
  };
  const manejarCerrarModalPago = () => setModalPagoAbierto(false);
  

  const signOut = () => {
    if (isAuthenticated) {
      logout();
    } else {
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("userEmail", "");
      window.location.reload();
    }
  };

  const getUserData = () => {
    if (isAuthenticated) {
      return user.name;
    } else {
      return localStorage.getItem("userEmail");
    }
  };

  // Agrega el estado mostrarBotonPago al principio del componente
  const [mostrarBotonPago, setMostrarBotonPago] = useState(true);

  // Agrega el estado mostrarBotonMercadoPago al principio del componente

  const handleChangeCantidad = async (productoId, nuevaCantidad) => {
    actualizarCantidad(productoId, nuevaCantidad);
    await createPreference();
      // Muestra el botón de MercadoPago
    setMostrarBotonMercadoPago(false);
    // Muestra el botón "Generar botón de pago" nuevamente
    setMostrarBotonPago(true);
  };

  const precioTotalGeneral = carrito.reduce((total, producto) => {
    return total + (producto.precio_$ * (producto.cantidad || 1));
  }, 0);

  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("APP_USR-b5cd3a44-d2dc-4925-8680-e558cca48b35");

  const createPreference = async () => {
    try {
      const items = carrito.map((producto) => ({
        title: producto.titulo,
        quantity: producto.cantidad || 1,
        currency_id: "ARS",
        unit_price: producto.precio_$
      }));
  
      const totalPrice = items.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
  
      // Crear una lista de descripciones de libros con cantidad (si es más de 1)
      const bookDescriptions = carrito.map((producto) => {
        const cantidad = producto.cantidad || 1;
        return `${producto.titulo}${cantidad > 1 ? ` (${cantidad})` : ""}`;
      });
  
      const response = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: `Compra de libros: ${bookDescriptions.join(", ")}`,
          price: totalPrice,
          quantity: 1,
          items: items
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        const { id } = data;
        return id;
      } else {
        console.error("Error en la solicitud HTTP");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      // Oculta el botón "Generar botón de pago"
      setMostrarBotonPago(false);
      setMostrarBotonMercadoPago(true);
    }
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#2196F3' }}>
        <Toolbar>
          <Link to="/"> {/* Agrega el enlace al inicio */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={logo} alt="Logo" />
            </IconButton>
          </Link>
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
          <IconButton aria-label="cart" onClick={manejarAbrirModalCarrito}>
            <StyledBadge badgeContent={carrito.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Modal open={modalCarritoAbierto} onClose={manejarCerrarModalCarrito}>
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={manejarCerrarModalCarrito}
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
              <Button variant="contained" color="primary" onClick={handleBuy} style={{ display: mostrarBotonPago ? 'block' : 'none' }}>
                Generar botón de pago
              </Button>
              <Button style={{ display: mostrarBotonMercadoPago ? 'block' : 'none' }}>
                {preferenceId && <Wallet initialization={{ preferenceId }} />}
              </Button>
            </>
          )}
        </Box>
      </Modal>
      
      <Modal open={modalPagoAbierto} onClose={manejarCerrarModalPago}>
        <Box sx={modalStyle}>
          <PasarelaDePago total={precioTotalGeneral} cerrarModal={manejarCerrarModalPago} />
        </Box>
      </Modal>
    </Box>
  );
}
