import React, { useEffect, useState } from 'react'
import App from '../App'
// import axios from 'axios'
import { useParams } from 'react-router-dom'

const Detail = () => {


    const { id } = useParams();
    console.log({id})

    // const id = useParams.id;
    
    const [libro, setLibro] = useState({});

    useEffect(() => {
      // Utiliza fetch para obtener los datos del servidor
      fetch(`http://localhost:3000/detail/${id}`)
      // fetch('http://localhost:3000/detail/:id')
        .then(response => response.json())
        .then(data => {
          if (data.titulo) {
            setLibro(data);
          } else {
            window.alert('No hay libros con ese ID');
          }
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
          window.alert('Ocurrió un error al obtener datos del servidor.');
        });

      // Limpia el estado al desmontar el componente
      return () => setLibro({});
    }, [id]);

   

   
  return (
    <div>
      <img src={libro.url_imagen}/>
      <h1>{libro.titulo}</h1>
      <h4>{libro.autor}</h4>
      <h4>Precio: $  {libro.precio_$}</h4>
      {/* <h4>Categoria = {}</h4> */}
      <h4>Cantidad de páginas: {libro.nro_paginas}</h4>
      <h4>Peso: {libro.peso} gramos </h4>
      <h4>Fecha de publicacion: {libro.fecha_publicacion}</h4>
      <h4>ISBN: {libro.ISBN}</h4>
      <h4>Editorial: {libro.editorial}</h4>
      <h4>Idioma: {libro.idioma}</h4>
      <h3>Descripción: {libro.descripcion} </h3>

    </div>)

}

export default Detail