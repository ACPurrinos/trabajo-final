import React from 'react';
import './App.css';
import ListadoDeProductos from './components/Listado de Productos/ListadoDeProductos';
import SearchBar from './components/SearchBar/SearchBar';
import { Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Detail from './Views/Detail';
import Navbar from './components/NavBar/NavBar';
import MensajeSinLibros from './components/Mensaje sin libros/MensajeSinLibros';
import Login from './Views/Login';
import RegistroExitoso from './Views/RegistroExitoso';
import Filtros from './components/Filtros/Filtros';
import { CarritoProvider } from './providers/carritoContext';
import Footer from './components/Footer/Footer';
import FiltrosAdmin from './components/FiltrosAdmin/FiltrosAdmin';
import PATHROUTES from './helpers/PathRoutes.helper';
import PanelAdministrador from './components/PanelAdministrador/PanelAdministrador';
import DashboardAdmin from './Views/DashboardAdmin';
import FormCategoria from './components/FormCategoria/FormCategoria';
import { Dashboard } from '@mui/icons-material';
import ProductTable from './components/ProductTable/ProductTable';
import VerCategorias from './components/Ver Categorias/VerCategorias';
import EditProduct from './components/Editar Producto/EditProduct';

function App() {
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [precioMax, setPrecioMax] = useState(0); 
  const [filtroActual, setFiltroActual] = useState({ categoria: '', precio: 20000, ordenamiento: 'precio_desc' });

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((data) => {
        setLibros(data);
        setLibrosFiltrados(data);
        const maxPrecioEncontrado = data.reduce((max, libro) => Math.max(max, libro.precio_$), 0);
        const precioMaxConIncremento = maxPrecioEncontrado * 1.10; 
        const precioMaxRedondeado = Math.ceil(precioMaxConIncremento / 1000) * 1000;
        setPrecioMax(precioMaxRedondeado);
        setLibros(data);
        setLibrosFiltrados(data); 
      });
  }, []);

  const aplicarFiltro = () => {
    let queryParams = '';
    if (filtroActual.categoria) {
      queryParams += `categoria=${filtroActual.categoria}&`;
    }
    queryParams += `precio=${filtroActual.precio}&`;
    queryParams += `ordenamiento=${filtroActual.ordenamiento}`;

    fetch(`http://localhost:3000/?${queryParams}`)
      .then(response => response.json())
      .then(data => setLibrosFiltrados(data))
      .catch(error => console.error('Error:', error));
  };

  const onPriceChange = (precio) => {
    setFiltroActual(prevState => ({ ...prevState, precio: precio }));
    aplicarFiltro();
  };

  const onPriceChanges = (nuevoPrecio) => {
    fetch(`http://localhost:3000/?precio_$=${nuevoPrecio}`)
      .then(response => response.json())
      .then(data => {
        setLibrosFiltrados(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleFilterChanges = (categoria) => {
    setFiltroActual(prevState => ({ ...prevState, categoria: categoria }));
    aplicarFiltro();
  };

  // Manejar el cambio de filtro
  const handleFilterChange = (categoria) => {
    const queryParams = new URLSearchParams();
    if (categoria) {
      queryParams.append('categoria', categoria);
    }

    fetch(`http://localhost:3000/?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        setLibrosFiltrados(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const onSortChange = (ordenamiento) => {
    setFiltroActual(prevState => ({ ...prevState, ordenamiento: ordenamiento }));
    aplicarFiltro();
  };

  const onSearchSubmit = (searchTerm) => {
    fetch(`http://localhost:3000/search?query=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => setLibrosFiltrados(data))
      .catch(error => console.error('Error al buscar libros:', error));
  };

  useEffect(() => {
    aplicarFiltro(); // Aplica el filtro cada vez que cambia filtroActual
  }, [filtroActual]);

  const [isContactModalOpen, setContactModalOpen] = useState(false);

    const handleOpenContactModal = () => {
        setContactModalOpen(true);
    };

    const handleCloseContactModal = () => {
        setContactModalOpen(false);
    };

    return (
      <CarritoProvider>
    <div>
      <Navbar/> 
      <Routes>
        <Route path={"/"} element={
          <>
            <SearchBar onSearchSubmit={onSearchSubmit} />
            <Filtros 
              onFilterChange={handleFilterChange} 
              onPriceChange={onPriceChange}
              onSortChange={onSortChange} 
              precioMax={precioMax} 
            />
            {librosFiltrados.length > 0 ? 
              <ListadoDeProductos libros={librosFiltrados} /> :
              <MensajeSinLibros />
            }
          </>
        } />
        <Route path={'/detail/:id'} element={<Detail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registroexitoso' element={<RegistroExitoso/>}/>

        {/* Rutas del Administrador */}
        <Route path={PATHROUTES.ADMINISTRADOR} element={
          <>
            <FiltrosAdmin onFilterChange={handleFilterChanges} onPriceChange={onPriceChanges} />
            <DashboardAdmin />
          </>
        }/>

        <Route path={PATHROUTES.FORMPRODUCTOS} element={
          <>
            <FiltrosAdmin onFilterChange={handleFilterChanges} onPriceChange={onPriceChanges} />
            <DashboardAdmin />
            <PanelAdministrador />
          </>
        }/>

        <Route path={PATHROUTES.VERPRODUCTOS} element={
          <>
            <FiltrosAdmin onFilterChange={handleFilterChanges} onPriceChange={onPriceChanges} />
            <DashboardAdmin />
            <ProductTable />
          </>
        }/>

        <Route path={PATHROUTES.FORMCATEGORIA} element={
          <>
            <FiltrosAdmin onFilterChange={handleFilterChanges} onPriceChange={onPriceChanges} />
            <DashboardAdmin />
            <FormCategoria />
          </>
        }/>
        <Route
          path={PATHROUTES.VERCATEGORIAS}
          element={
            <>
              <DashboardAdmin />
              <VerCategorias />
            </>
          }
        />

        <Route
          path={PATHROUTES.EDITARPRODUCTO}
          element={
            <>
              <DashboardAdmin />
              <EditProduct />
            </>
          }
        />
      </Routes>
      <Footer/>
    </div>
  </CarritoProvider>
    );
  } 
export default App;
