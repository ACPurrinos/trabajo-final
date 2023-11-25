
import './App.css'

import ListadoDeProductos from './components/Listado de Productos/ListadoDeProductos';
import SearchBar from './components/SearchBar/SearchBar'
// import libros, {Libro} from './data.js';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Detail from './Views/Detail';
import PATHROUTES from './helpers/PathRoutes.helper';


function App() {

  const [libros, setLibros] = useState([])

  useEffect(() => {
   fetch('http://localhost:3000')
   .then((response)=>response.json())
   .then((data) => {
      if (data) setLibros(data)
   });
 return setLibros([])
  }, [])

//   const libros = []


//    fetch(`http://localhost:3000`)
// .then((response)=>response.json())
// .then((data)=>{
 
// data.map((libro) => libros.push(libro))
// return libros

// })
   


  return (

    <div>
 <SearchBar></SearchBar>


<Routes>
{/* <Route path={"/"} element={ <ListadoDeProductos data={data} ></ListadoDeProductos>}></Route>  */}


<Route path={"/"} element={ <ListadoDeProductos libros={libros}></ListadoDeProductos>}></Route>
<Route path={'/detail/:id'} element={<Detail/>}/>


</Routes>

     
      
     
    </div>
  )
} 

export default App
