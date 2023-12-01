import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './ProductTable.module.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí debes realizar la llamada a la base de datos para obtener los productos
    // Puedes utilizar fetch, axios, u otra librería para hacer la solicitud
    // Ejemplo de fetch:
    fetch('http://localhost:3000') // Ajusta la URL según tu backend
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (id) => {
    // Lógica para editar el producto con el ID proporcionado
    console.log('Editar producto con ID:', id);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el producto con el ID proporcionado
    console.log('Eliminar producto con ID:', id);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.header}>ID</th>
          <th className={styles.header}>Título</th>
          <th className={styles.header}>Autor</th>
          <th className={styles.header}>Precio</th>
          <th className={styles.header}>Editorial</th>
          <th className={styles.header}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className={styles.cell}>{product.id}</td>
            <td className={styles.cell}>{product.titulo}</td>
            <td className={styles.cell}>{product.autor}</td>
            <td className={styles.cell}>{product.precio_$}</td>
            <td className={styles.cell}>{product.editorial}</td>
            <td className={`${styles.cell} ${styles.actions}`}>
              <Button variant="outlined" size="small" onClick={() => handleEdit(product.id)}>
                Editar
              </Button>
              <Button variant="outlined" size="small" onClick={() => handleDelete(product.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;