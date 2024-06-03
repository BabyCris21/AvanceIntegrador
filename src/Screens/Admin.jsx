import React, { useState, useEffect } from 'react';

const Admin = () => {
  // Supongamos que tienes datos de ejemplo en un array
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar la lógica para obtener los datos de la base de datos
    // Por ejemplo, podrías hacer una solicitud a un servidor usando fetch o axios
    // y luego actualizar el estado con los datos obtenidos

    // Ejemplo de datos de prueba
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user',{method: 'GET',});
        const jsonData = await response.json();
        // Ajustar la fecha para mostrar un día antes
        const modifiedData = jsonData.map(item => {
          // Convertir la cadena de fecha en un objeto Date
          const date = new Date(item.bornDate);
          // Restar un día a la fecha
          date.setDate(date.getDate() );
          // Formatear la nueva fecha
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() )).slice(-1);
          const day = ('0' + date.getDate()).slice(-1);
          const formattedDate = `${year}-${month}-${day}`;
          // Devolver el objeto con la fecha ajustada
          return { ...item, bornDate: formattedDate };
        });
        setData(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha de nacimiento</th>
            <th>Teléfono</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dni}</td>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              {/* Mostrar la fecha de nacimiento ajustada */}
              <td>{item.bornDate}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
