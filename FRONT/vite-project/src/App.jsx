import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './providers/carritoContext';
import Navbar from './components/NavBar/NavBar';
import ListadoDeProductos from './components/Listado de Productos/ListadoDeProductos';
import Filtros from './components/Filtros/Filtros';
import MensajeSinLibros from './components/Mensaje sin libros/MensajeSinLibros';
import Footer from './components/Footer/Footer';
import Detail from './Views/Detail';
import Login from './Views/Login';
import RegistroExitoso from './Views/RegistroExitoso';

function App() {
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [precioMax, setPrecioMax] = useState(0); 
  const [filtroActual, setFiltroActual] = useState({ categoria: '', precio: 100000, ordenamiento: 'precio_desc' });

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((data) => {
        setLibrosFiltrados(data);
        const maxPrecioEncontrado = data.reduce((max, libro) => Math.max(max, libro.precio_$), 0);
        const precioMaxConIncremento = maxPrecioEncontrado * 1.10; 
        const precioMaxRedondeado = Math.ceil(precioMaxConIncremento / 1000) * 1000;
        setPrecioMax(precioMaxRedondeado); 
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

  const handleFilterChange = (categoria) => {
    setFiltroActual(prevState => ({ ...prevState, categoria: categoria }));
    aplicarFiltro();
  };

  const onSortChange = (ordenamiento) => {
    setFiltroActual(prevState => ({ ...prevState, ordenamiento: ordenamiento }));
    aplicarFiltro();
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
    <div>
      <CarritoProvider>
        <Navbar /> 
        <div style={{ padding: '100px'}}>
          <Routes>
            <Route path={"/"} element={
              <>
               
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
            <Route path='/login' element={<Login/>}></Route>
            <Route path={'registroexitoso'} element={<RegistroExitoso/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </CarritoProvider>
    </div>
  );
} 

export default App;

