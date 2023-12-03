// import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import styles from './VerCategorias.module.css'

// const VerCategorias = () => {
//   const [categorias, setCategorias] = useState([]);

//   useEffect(() => {
  
//     fetch('http://localhost:3000/categorias')
//       .then((response) => response.json())
//       .then((data) => setCategorias(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   // const handleEdit = (id) => {
//   //   // Lógica para editar el producto con el ID proporcionado
//   //   console.log('Editar producto con ID:', id);
//   // };

//   // const handleDelete = (id) => {
//   //   // Lógica para eliminar el producto con el ID proporcionado
//   //   console.log('Eliminar producto con ID:', id);
//   // };

//   return (
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th className={styles.header}>ID</th>
//           <th className={styles.header}>Categoría:</th>
//         </tr>
//       </thead>
//       <tbody>
//         {categorias.map((categoria) => (
//           <tr key={categoria.id}>
//             <td className={styles.cell}>{categoria.id}</td>
//             <td className={styles.cell}>{categoria.nombre}</td>
//             <td className={`${styles.cell} ${styles.actions}`}>
//               <Button variant="outlined" size="small" onClick={() => handleEdit(product.id)}>
//                 Editar
//               </Button>
//               <Button variant="outlined" size="small" onClick={() => handleDelete(product.id)}>
//                 Eliminar
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// export default VerCategorias

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './VerCategorias.module.css';

const VerCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleEditCategoria = (id) => {
    // Lógica para editar la categoría con el ID proporcionado
    console.log('Editar categoría con ID:', id);
  };

  const handleDeleteCategoria = (id) => {
    // Lógica para eliminar la categoría con el ID proporcionado
    console.log('Eliminar categoría con ID:', id);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>ID</th>
            <th className={styles.header}>Categoría</th>
            <th className={styles.header}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className={styles.cell}>{categoria.id}</td>
              <td className={styles.cell}>{categoria.nombre}</td>
              <td className={`${styles.cell} ${styles.actions}`}>
                <Button variant="outlined" size="small" onClick={() => handleEditCategoria(categoria.id)}>
                  Editar
                </Button>
                <Button variant="outlined" size="small" onClick={() => handleDeleteCategoria(categoria.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerCategorias;
