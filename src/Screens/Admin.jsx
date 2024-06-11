import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; 

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const modifiedData = jsonData.map(item => {
          const date = new Date(item.bornDate);
          const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const genderLabel = item.gender === 'M' ? 'Masculino' : item.gender === 'F' ? 'Femenino' : '';
          return { ...item, bornDate: formattedDate, gender: genderLabel };
        });
        setData(modifiedData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    navigate('/perfil', { state: { user } });
  };

  const handleDelete = async (dni) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setData(data.filter(item => item.dni !== dni));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.lastname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.dni.toString().includes(searchTerm)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>Admin Panel</h2>
        <input 
          type="text" 
          placeholder="Buscar por nombre, apellido o DNI" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="search-input"
        />
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
            {filteredData.map(item => (
              <tr key={item.id}>
                <td data-label="DNI">{item.dni}</td>
                <td data-label="Nombres">{item.name}</td>
                <td data-label="Apellidos">{item.lastname}</td>
                <td data-label="Fecha de nacimiento">{item.bornDate}</td>
                <td data-label="Teléfono">{item.phone}</td>
                <td data-label="Género">{item.gender}</td>
                <td data-label="Acciones">
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.dni)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
