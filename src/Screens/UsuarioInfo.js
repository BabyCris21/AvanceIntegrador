import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import UserModel from "../models/userModels"; // Asegúrate de que la ruta sea correcta

const UsuarioInfo = () => {
  const [formData, setFormData] = useState(UserModel);
  const [dni, setDni] = useState("");

  // Obtener el token desde el localStorage

  useEffect(() => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Decodificar el token para extraer el DNI
      const decodedToken = jwtDecode(token);
      const userDni = decodedToken.uid;
      setDni(userDni);

      // Fetch user data based on DNI
      fetchUserData(userDni);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchUserData = async (dni) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${dni}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFormData({
        dni: data.dni,
        name: data.name,
        lastname: data.lastname,
        bornDate: data.bornDate,
        phone: data.phone,
        email: data.email,
        address: data.address,
        gender: data.gender,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData(dni);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  return (
    <div className="usuario-form">
      <h3>Información de Usuario</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" name="dni" value={formData.dni} readOnly />

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
          onChange={handleChange}
          required
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
