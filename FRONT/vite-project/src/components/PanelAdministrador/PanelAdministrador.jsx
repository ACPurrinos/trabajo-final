
import React, { useState, useEffect } from 'react';
import styles from './PanelAdministrador.module.css';

const PanelAdministrador = () => {
  const [producto, setProducto] = useState({
    titulo: '',
    autor: '',
    precio_$: 0,
    nro_paginas: 0,
    peso: 0,
    fecha_publicacion: '', 
    ISBN: '',
    editorial: '',
    idioma: '',
    descripcion: '',
    stock: false,
    url_imagen: '',
    categoria: []
  });


  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/categorias'); 
        if (!response.ok) {
          throw new Error('Error al obtener categorías.');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error.message);
      }
    };

    // Llama a la función para obtener las categorías cuando se monta el componente
    fetchCategorias();
  }, []); 


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducto({ ...producto, [name]: value });
  };


//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     const updatedProducto = { ...producto, [name === 'precio_$' ? 'precio' : name]: value };
  
//   setProducto(updatedProducto);
//     // setProducto({ ...producto, [name]: value });
//   };

//   const handleCategoriaChange = (event) => {
//     const value = event.target.value;
//     setProducto({ ...producto, categoria: value });
//   };

  const handleCategoriaChange = (event) => {
    const value = event.target.value;
    const updatedCategorias = [...producto.categoria];
  
    // Si la categoría ya está seleccionada, quítala; de lo contrario, agrégala
    if (updatedCategorias.includes(value)) {
      const index = updatedCategorias.indexOf(value);
      updatedCategorias.splice(index, 1);
    } else {
      updatedCategorias.push(value);
    }
  
    setProducto({ ...producto, categoria: updatedCategorias });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(); 
    console.log('Producto seleccionado:', producto);
  }
   

    const postData = async () => {
        const url = 'http://localhost:3000';       
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              
              ...producto,
              precio_$: parseInt(producto.precio_$, 10), // Convertir a entero
          peso: parseInt(producto.peso, 10), // Convertir a entero
          categorias: producto.categoria.map(Number),
              stock: producto.stock === "on" ? true : false,
             
             
          }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
          // Puedes manejar la respuesta del servidor según tus necesidades
      
        } catch (error) {
          console.error('Error al enviar la solicitud:', error.message);
          // Puedes manejar los errores aquí
        }
    };
    // Aquí puedes enviar el producto al backend o realizar otras acciones necesarias
    
    // Enviar el producto al backend, etc.
    const precioValue = producto.precio_$;


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Formulario de Producto</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={producto.titulo}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={producto.autor}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        {/* <div className={styles.formGroup}>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={producto.precio_$}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div> */}

        {/* <div className={styles.formGroup}>
  <label htmlFor="precio">Precio:</label>
  <input
    type="number"
    id="precio_$"
    name="precio_$"  // Cambia el name a "precio"
    const nuevoPrecio ={producto.precio_$}
    value= {nuevoPrecio}
    onChange={handleInputChange}
    required
    className={styles.input}
  />
</div> */}

<div className={styles.formGroup}>
          <label htmlFor="precio_$">Precio:</label>
          <input
            type="number"
            id="precio_$"
            name="precio_$"
            value={precioValue}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nro_paginas">Número de Páginas:</label>
          <input
            type="number"
            id="nro_paginas"
            name="nro_paginas"
            value={producto.nro_paginas}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="peso">Peso:</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={producto.peso}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
  <label htmlFor="fecha_publicacion">Fecha de Publicación:</label>
  <input
    type="date"
    id="fecha_publicacion"
    name="fecha_publicacion"
    value={producto.fecha_publicacion}
    onChange={handleInputChange}
    required
    className={styles.input}
    pattern="\d{4}-\d{2}-\d{2}" // Patrón para el formato YYYY-MM-DD
  />
</div>

        <div className={styles.formGroup}>
          <label htmlFor="ISBN">ISBN:</label>
          <input
            type="text"
            id="ISBN"
            name="ISBN"
            value={producto.ISBN}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="editorial">Editorial:</label>
          <input
            type="text"
            id="editorial"
            name="editorial"
            value={producto.editorial}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="idioma">Idioma:</label>
          <input
            type="text"
            id="idioma"
            name="idioma"
            value={producto.idioma}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            rows={4}
            cols={50}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={handleCategoriaChange}
            className={styles.select}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>


        <div className={styles.formGroup}>
          <label htmlFor="stock">En Stock:</label>
          <input
            type="checkbox"
            id="stock"
            name="stock"
            checked={producto.stock}
            onChange={handleInputChange}
            className={styles.checkbox}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="url_imagen">URL de Imagen:</label>
          <input
            type="text"
            id="url_imagen"
            name="url_imagen"
            value={producto.url_imagen}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Guardar Producto
</button>
</form>
</div>
);
            };    

export default PanelAdministrador;
