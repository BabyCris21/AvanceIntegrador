import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserModel from "../models/userModels";

const UsuarioInfo = ({ setUserName }) => {
  const [formData, setFormData] = useState(UserModel);
  const [originalData, setOriginalData] = useState(UserModel); // Nuevo estado para mantener una copia de respaldo
  const [dni, setDni] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userDni = decodedToken.uid;
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
    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFormData(data);
      setOriginalData(data); // Actualizar la copia de respaldo
      setUserName(data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedData = await response.json();
      setFormData(updatedData);
      setOriginalData(updatedData); // Actualizar la copia de respaldo
      setUserName(updatedData.name);
      window.alert("Datos actualizados correctamente.");
      window.location.reload(); // Recargar la página después de que se muestre la alerta
    } catch (error) {
      console.error("Error updating user data:", error);
      window.alert(`Error al actualizar los datos: ${error.message}`);
      setFormData(originalData);
    }
  };
  
  
  return (
    <div className="usuario-form">
      <h3>Información de Usuario</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" name="dni" value={formData.dni} disabled />

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Apellidos:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="bornDate">Fecha de Nacimiento:</label>
        <input
          type="text"
          id="bornDate"
          name="bornDate"
          value={formData.bornDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          disabled
        />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
        />

        <label htmlFor="gender">Género:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UsuarioInfo;
