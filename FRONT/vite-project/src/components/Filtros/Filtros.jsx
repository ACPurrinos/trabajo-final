import React, { useState } from 'react';
import styles from './Filtros.module.css';

const Filtros = ({ onFilterChange, onPriceChange }) => {
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState(100);

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
        if (onFilterChange) {
            onFilterChange(e.target.value);
        }
    };

    const handlePrecioChange = (e) => {
        setPrecio(e.target.value);
        if (onPriceChange) {
            onPriceChange(e.target.value);
        }
    };

    return (
        <div className={styles.container}>
            <input 
                type="text" 
                name="categoria" 
                className={styles.inputCategoria}
                value={categoria} 
                onChange={handleCategoriaChange} 
                placeholder="Categoría" 
            />
            
            {/* Control deslizador para el precio */}
            <input
                type="range"
                name="precio_$"
                className={styles.slider}
                min="0"
                max="1000"
                value={precio}
                onChange={handlePrecioChange}
            />
            <span className={styles.precioLabel}>${precio}</span>
        </div>
    );
};

export default Filtros;


