import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; 
import ContactNews from './ContactNews'; // Importa el componente ContactNews

const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user', { method: 'GET' });
        const jsonData = await response.json();
        const modifiedData = jsonData.map(item => {
          const date = new Date(item.bornDate);
          const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          // Agregar lógica para mostrar "Masculino" o "Femenino" en base a la letra del género
          const genderLabel = item.gender === 'M' ? 'Masculino' : item.gender === 'F' ? 'Femenino' : '';
          return { ...item, bornDate: formattedDate, gender: genderLabel };
        });
        setData(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    // Redirige a la página de datos con los datos del usuario como estado
    navigate('/datos', { state: { user } });
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el usuario con el ID proporcionado
    console.log('Eliminando usuario con ID:', id);
  };

  return (
    <div className="admin-page">
      <div className="admin-container"> 
        <h2>Admin Panel</h2>
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de nacimiento</th>
              <th>Teléfono</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.dni}</td>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.bornDate}</td>
                <td>{item.phone}</td>
                <td>{item.gender}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ContactNews /> {/* Coloca ContactNews fuera del contenedor de la tabla */}
    </div>
  );
}

export default Admin;
