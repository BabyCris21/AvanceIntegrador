import React, { useState } from 'react';
import axios from 'axios';

const Paciente = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('{{url}}/api/patient', {
        nombre,
        apellido,
        edad,
        genero
      });

      // Limpiar el formulario después de enviar los datos
      setNombre('');
      setApellido('');
      setEdad('');
      setGenero('');

      alert('Registro exitoso!');
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      alert('Error al registrar paciente. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Registro de Paciente</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="edad">Edad:</label>
          <input type="number" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Paciente;
