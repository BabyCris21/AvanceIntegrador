import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserModel from "../models/userModels";

const DoctorInfo = ({ setUserName }) => {
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

  const token = localStorage.getItem("token");
  
  const fetchUserData = async (dni) => {
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/${dni}`, {headers: {'token':token}});
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }
      const data = await response.json();
      data.bornDate = formatDate(data.bornDate); // Formatea la fecha
      setFormData(data);
      setOriginalData(data);
      setUserName(data.name);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const modifiedFormData = {
        ...formData,
        specialty: formData.specialty.map(spec => spec.uid).filter(uid => uid !== undefined) // Filtrar los uids undefined
      };
      console.log("Datos a enviar en la solicitud PUT:", modifiedFormData);
      
      const response = await fetch(`http://localhost:8080/api/doctor/${dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedFormData),
      });
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }
      const updatedData = await response.json();
      updatedData.bornDate = formatDate(updatedData.bornDate);
      setFormData(updatedData);
      setOriginalData(updatedData);
      setUserName(updatedData.name);
      window.alert("Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
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
    <div className="doctor-form">
      <h3>Información de Doctor</h3>
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
          type="date"
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

        <label htmlFor="CMP">CMP:</label>
        <input
          type="text"
          id="CMP"
          name="CMP"
          value={formData.CMP}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DoctorInfo;
