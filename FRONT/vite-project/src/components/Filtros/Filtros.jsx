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
            <select
                name="categoria"
                className={styles.inputCategoria}
                value={categoria}
                onChange={handleCategoriaChange}
            >
                <option value="">Selecciona una categoría</option>
                <option value="Arte">Arte</option>
                <option value="Computacion y Tecnologia">Computacion y Tecnologia</option>
                <option value="Ficcion romantica">Ficcion romantica</option>
                <option value="Economia y Finanzas">Economia y Finanzas</option>
                <option value="Infantil y Juvenil">Infantil y Juvenil</option>
                <option value="Historia de America">Historia de America</option>
                <option value="Divulgacion cientifica">Divulgacion cientifica</option>
            </select>
            
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


