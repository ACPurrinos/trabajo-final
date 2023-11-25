import React from 'react'
import { Link } from 'react-router-dom';


function DetalleDeProducto(props) {
  
  
    const {id, titulo, autor, precio_$, editorial, categoria, año_publicacion, url_imagen} = props;
    console.log(categoria)

  return (
    <div>
      <img src={url_imagen}/>
        <h2>{titulo}</h2>
        <h5>Autor: {autor}</h5>
        <h5>$ {precio_$}</h5>
        <h5>Editorial: {editorial}</h5>
        <h5>Categoria: {categoria}</h5>
        <h5>Año de publicación: {año_publicacion}</h5>

        <Link  to={`/detail/${id}`}>
        <button>Ver detalle</button>
        </Link>
        <hr></hr>


    </div>
  )
}

export default DetalleDeProducto