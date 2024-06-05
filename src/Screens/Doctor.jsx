import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import ContactNews from './ContactNews'; // Importa el componente ContactNews

const Doctor = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor', { method: 'GET' });
        const jsonData = await response.json();
        console.log(jsonData);
        const modifiedData = jsonData.map(item => {
          const date = new Date(item.bornDate);
          const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          return { ...item, bornDate: formattedDate };
        });
        setData(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (doctor) => {
    // Redirige a la página de datos con los datos del doctor como estado
    navigate('/datos-doctor', { state: { doctor } });
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el doctor con el ID proporcionado
    console.log('Eliminando doctor con ID:', id);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>Panel de administración de doctores</h2>
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>CMP</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de nacimiento</th>
              <th>Teléfono</th>
              <th>Especialidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.dni}>
                <td>{item.dni}</td>
                <td>{item.CMP}</td>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.bornDate}</td>
                <td>{item.phone}</td>
                <td>
                  {item.specialty.map(spec => spec.name).join(',  ')}
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.dni)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ContactNews /> {/* Coloca ContactNews fuera del contenedor de la tabla */}
    </div>
  );
};

export default Doctor;
