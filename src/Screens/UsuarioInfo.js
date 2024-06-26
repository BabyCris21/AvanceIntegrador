import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import UserModel from "../models/userModels"; // Asegúrate de que este modelo esté correctamente definido

const UsuarioInfo = ({ setUserName }) => {
  const [formData, setFormData] = useState(UserModel);
  const [originalData, setOriginalData] = useState(UserModel);
  const [dni, setDni] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userDni = decodedToken.dni;
      setDni(userDni);
      fetchUserData(userDni);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "name") {
      setUserName(value);
    }
  };

  const fetchUserData = async (dni) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`, { 
        method: 'GET',
        headers: { 'token': token } 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched user data:", data);
      setFormData(data || UserModel); // Asegurarse de que formData no sea undefined
      setOriginalData(data || UserModel); // Asegurarse de que originalData no sea undefined
      setUserName(data?.name || '');
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`, {
        method: "PUT",
        headers: {
          'token': token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      console.log("Updated user data:", updatedData);
      setFormData(updatedData || UserModel); // Asegurarse de que formData no sea undefined
      setOriginalData(updatedData || UserModel); // Asegurarse de que originalData no sea undefined
      setUserName(updatedData?.name || '');
      window.alert("Datos actualizados correctamente.");
      
      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
      window.alert(`Error al actualizar los datos: ${error.message}`);
      setFormData(originalData);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="usuario-form">
      <h3>Información de Usuario</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" name="dni" value={formData?.dni || ''} disabled />

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData?.name || ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Apellidos:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData?.lastname || ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="bornDate">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="bornDate"
          name="bornDate"
          value={formData?.bornDate ? formatDate(formData.bornDate) : ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData?.phone || ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData?.email || ''}
          disabled
        />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData?.address || ''}
          onChange={handleChange}
        />

        <label htmlFor="gender">Género:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData?.gender || ''}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UsuarioInfo;
