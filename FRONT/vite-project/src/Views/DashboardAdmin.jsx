import React, { useState } from 'react';
import PanelAdministrador from '../components/PanelAdministrador/PanelAdministrador';
import ProductTable from '../components/ProductTable/ProductTable';
import styles from './DashboardAdmin.module.css';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);

    switch (option) {
      case 'crearProducto':
        console.log('Crear Producto');
     
        break;

      case 'crearCategoria':
        console.log('Crear Categoría');
    
        break;

      case 'filtrarProducto':
        console.log('Filtrar por nombre');

        break;

      case 'verProductos':
  
        break;

      default:
        console.log('Selecciona una opción');
    }
  };

  return (
    <div>
      <div>
        <label>Selecciona una opción:</label>
        <div>
          <button onClick={() => handleButtonClick('crearProducto')}>Crear Producto</button>
          <button onClick={() => handleButtonClick('crearCategoria')}>Crear Categoría</button>
          <button onClick={() => handleButtonClick('filtrarProducto')}>Filtrar por nombre</button>
          <button onClick={() => handleButtonClick('verProductos')}>Ver mis productos</button>
        </div>
      </div>

  
      {selectedOption === 'crearProducto' && (
        <Link to="/administrador/formulario">
          <PanelAdministrador />
        </Link>
      )}

  
      {selectedOption === 'verProductos' && <ProductTable />}
    </div>
  );
};

export default DashboardAdmin;





