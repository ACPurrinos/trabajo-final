
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditProduct.module.css'
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel, Checkbox } from '@mui/material';


const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // solicitud para obtener los detalles del producto con el ID proporcionado
    fetch(`http://localhost:3000/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  const handleUpdate = async () => {
    // Lógica para actualizar el producto
    try {
      const response = await fetch(`http://localhost:3000/editar-producto/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      console.log('Producto actualizado exitosamente con ID:', id);
      window.alert('El producto se actualizó exitosamente');
      navigate('/administrador/mis-productos'); // Redirige a la página principal después de la actualización
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
    }
  };

  const handleChange = (e) => {
    // Actualiza el estado del producto con los cambios del formulario
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <TextField
        label="Título"
        name="titulo"
        value={product.titulo || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Autor"
        name="autor"
        value={product.autor || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio"
        name="precio_$"
        type="number"
        value={product.precio_$ || 0}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

<TextField
        label="Cantidad de páginas"
        name="nro_paginas"
        type='number'
        value={product.nro_paginas || 0}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

<TextField
        label="Peso / gramos:"
        name="peso"
        type='number'
        value={product.peso || 0}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

<TextField
        label="Fecha de publicación:"
        name="fecha_publicacion"
        type='date'
        value={product.fecha_publicacion || ''}
        onChange={handleChange}
        pattern="\d{4}-\d{2}-\d{2}"
        fullWidth
        margin="normal"
        required
      />
<div>
<TextField
        label="ISBN:"
        name="ISBN"
        value={product.ISBN || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
       
      />
      {product.ISBN && product.ISBN.length !== 13 && (
  <span className={styles.error}>El ISBN debe tener 13 dígitos</span>
)}

        {/* {isbnExists && (
          <span className={styles.error}>El ISBN ya existe en la base de datos</span>
        )} */}

</div>

<TextField
        label="Editorial:"
        name="editorial"
        value={product.editorial || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

<TextField
  label="Idioma actual"
  name="idiomaActual"
  value={product.idioma || ''}
  fullWidth
  margin="normal"
  InputProps={{
    readOnly: true,
  }}
/>

<TextField
  label="Nuevo Idioma"
  name="idioma"
  select
  value={product.idioma || ''}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
>
  <MenuItem value={product.idioma}>{product.idioma}</MenuItem>
  <MenuItem value="Castellano">Castellano</MenuItem>
  <MenuItem value="Inglés">Inglés</MenuItem>
  <MenuItem value="Alemán">Alemán</MenuItem>
  <MenuItem value="Latín">Latín</MenuItem>
  <MenuItem value="Francés">Francés</MenuItem>
  <MenuItem value="Hebreo">Hebreo</MenuItem>
  <MenuItem value="Otro">Otro</MenuItem>
</TextField>



<TextField
  label="Descripción"
  id="descripcion"
  name="descripcion"
  multiline
  rows={4}
  value={product.descripcion}
  onChange={handleChange}
  fullWidth
  margin="normal"
  className={styles.input}
/>


{/* <TextField
  label="Categoría"
  id="categoria"
  name="categoria"
  select
  value={product.Categoria}
  onChange={handleChange}
  fullWidth
  margin="normal"
  className={styles.input}
>
  <MenuItem value="">Selecciona una categoría</MenuItem>
  {categorias.map((categoria) => (
    <MenuItem key={categoria.id} value={categoria.id}>
      {categoria.nombre}
    </MenuItem>
  ))}
</TextField> */}

<TextField
  label="Stock:"
  name="stock"
  value={product.stock ? 'En stock' : 'Sin stock'}
  fullWidth
  margin="normal"
  InputProps={{
    readOnly: true  // Asumí que readOnly debe ser verdadero en ambos casos
  }}
/>
<span>STOCK</span>

{/* 
       <FormControlLabel
  control={
    <Checkbox
      id="stock"
      name="stock"
      checked={product.stock}
      onChange={handleChange}
      color="primary"  // You can change the color based on your design
    />
  } */}

{/* /> */}

<div className={styles.formGroup}>
          <label htmlFor="stock">En Stock:</label>
          <input
            type="checkbox"
            id="stock"
            name="stock"
            checked={product.stock}
            onChange={handleChange}
            className={styles.checkbox}
          />
        </div>


<TextField
  label="URL de Imagen"
  id="url_imagen"
  name="url_imagen"
  type="text"
  value={product.url_imagen}
  onChange={handleChange}
  fullWidth
  margin="normal"
  className={styles.input}
  required
/>



      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Actualizar Producto
      </Button>
    </div>
  );
};

export default EditProduct;