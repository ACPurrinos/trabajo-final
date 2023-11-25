import React from 'react'
import DetalleDeProducto from '../Detalle de Producto/DetalleDeProducto'



function ListadoDeProductos(props) {
    const {libros}=props
   
    
   

  return (
    <div>
        {console.log(libros)}

        {libros.map((libro)=>{
          const [categoria] = libro.Categoria;
          const {nombre} =categoria; 
          
            return(
            <DetalleDeProducto
            key = {libro.id}
            id = {libro.id}
            url_imagen = {libro.url_imagen}
            titulo = {libro.titulo}
            autor={libro.autor}
            precio_$={libro.precio_$}
            editorial={libro.editorial}
            categoria={nombre}
          
            año_publicacion={libro.año_publicacion}

        
            />
            );

        })}
    </div>
  )
}

export default ListadoDeProductos