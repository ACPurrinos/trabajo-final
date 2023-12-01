import React, { useState, useEffect} from 'react';
import styles from './Filtros.module.css';

const Filtros = ({ onFilterChange, onPriceChange, onSortChange, precioMax }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState(precioMax || 100);

    useEffect(() => {
        if (typeof precioMax === 'number' && !isNaN(precioMax)) {
            setPrecio(precioMax);
        }
    }, [precioMax]);

    // Función para cargar las categorías desde el backend
    useEffect(() => {
        fetch('http://localhost:3000/categorias')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const handleCategoriaChange = (e) => {
        const nuevaCategoria = e.target.value;
        setCategoria(nuevaCategoria);
        if (onFilterChange) {
            onFilterChange(nuevaCategoria, precio);
        }
    };

    const handlePrecioChange = (e) => {
        const nuevoPrecio = e.target.value;
        setPrecio(nuevoPrecio);
        if (onPriceChange) {
            onPriceChange(nuevoPrecio, categoria);
        }
    };

    const handleSortChange = (e) => {
        if (onSortChange) {
            onSortChange(e.target.value);
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
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                ))}
            </select>
            
            {/* Control deslizador para el precio */}
            <label  className={styles.sliderLabel}>
                Ajustar precio
            </label>
            <input
                type="range"
                name="precio_$"
                className={styles.slider}
                min="0"
                max={precioMax}
                value={precio}
                onChange={handlePrecioChange}
            />
            <span className={styles.precioLabel}>${precio}</span>
            {/* Control para el ordenamiento */}
            <select
                name="ordenamiento"
                className={styles.inputOrdenamiento}
                onChange={handleSortChange}
            >
                <option value="precio_asc">Precio: Menor a Mayor</option>
                <option value="precio_desc">Precio: Mayor a Menor</option>
            </select>
        </div>
    );
};

export default Filtros;
