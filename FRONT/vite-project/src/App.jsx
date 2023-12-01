import './App.css';
import ListadoDeProductos from './components/Listado de Productos/ListadoDeProductos';
import SearchBar from './components/SearchBar/SearchBar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Detail from './Views/Detail';
import Navbar from './components/NavBar/NavBar';
import MensajeSinLibros from './components/Mensaje sin libros/MensajeSinLibros';
import Login from './Views/Login';
import RegistroExitoso from './Views/RegistroExitoso';
import Filtros from './components/Filtros/Filtros';
import { CarritoProvider } from './providers/carritoContext';

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

  const onSearchSubmit = (searchTerm) => {
    fetch(`http://localhost:3000/search?query=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => setLibrosFiltrados(data))
      .catch(error => console.error('Error al buscar libros:', error));
  };

  useEffect(() => {
    aplicarFiltro(); // Aplica el filtro cada vez que cambia filtroActual
  }, [filtroActual]);

  return (
    <div>
      <CarritoProvider>
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
          <Route path='/login' element={<Login/>}></Route>
          <Route path={'registroexitoso'} element={<RegistroExitoso/>}></Route>
        </Routes>
      </CarritoProvider>
    </div>
  );
} 

export default App;
