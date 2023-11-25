import React from 'react'
import DetalleDeProducto from '../Detalle de Producto/DetalleDeProducto'



function ListadoDeProductos(props) {
    const {libros}=props
  return (
    <div>
        {console.log(libros)}
        {libros.map((libro)=>{
            return(
            <DetalleDeProducto
            key = {libro.id}
            id = {libro.id}
            titulo = {libro.titulo}
            autor={libro.autor}
            precio_$={libro.precio_$}
            editorial={libro.editorial}
            categoria={libro.categoria}
            año_publicacion={libro.año_publicacion}
            />
            );

        })}
    </div>
  )
}

export default ListadoDeProductos