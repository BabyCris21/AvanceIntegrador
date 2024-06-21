import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Header from './components/header/Header';
import Home from "./Screens/home/Home";
import Staff from './Screens/staff/Staff';
import Registro from "./Screens/registro/Registro";
import Login from './Screens/login_usuario/Login';
import Contact from "./Screens/contacto/Contact"; 
import Nosotros from "./Screens/nosotros/Nosotros";
import Servicios from './Screens/servicios/Servicios';
import Admin from './Screens/admin/Admin';
import Citas from "./Screens/Citas";
import Doctor from "./Screens/doctor/Doctor";
import Perfil from './Screens/perfil/Perfil';
import PerfilDoctor from './Screens/perfilDoctor/PerfilDoctor';
import ReservaCita from './Screens/ReservaCita';
import LoginDoctor from './Screens/login_doctor/loginDoctor';
import RegistroDoctor from './Screens/registro/RegistroDoctor';

// Componente RutaProtegida
const RutaProtegida = ({ rolesPermitidos }) => {
  const token = localStorage.getItem('token');
  
  // Verificar si el token existe
  if (!token) {
    console.log("No hay token, redirigiendo a login...");
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const rolUsuario = decodedToken.role; 
    console.log(rolUsuario);// Cambiado de 'rol' a 'role' para coincidir con tu JWT

    // Verificar si el rol del usuario está permitido
    if (rolesPermitidos.includes(rolUsuario)) {
      return <Outlet />;
    } else {
      console.log("Rol no permitido, redirigiendo a home...");
      return <Navigate to="/home" replace />;
    }
  } catch (error) {
    console.error("Error decodificando el token", error);
    return <Navigate to="/login" replace />;
  }
};

// Función para obtener el usuario del JWT
const obtenerUsuarioDeJWT = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken; // Asume que el rol está en el token decodificado
  } catch (error) {
    console.error("Error decodificando el token", error);
    return null;
  }
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <NavBar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/registrodoc" element={<RegistroDoctor />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/perfil" element={<Perfil />} />

          {/* Rutas protegidas */}
          <Route element={<RutaProtegida rolesPermitidos={['ADMIN_ROLE']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<RutaProtegida rolesPermitidos={['DOCTOR_ROLE']} />}>
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/perfildoctor" element={<PerfilDoctor />} />
          </Route>
          <Route element={<RutaProtegida rolesPermitidos={['ADMIN_ROLE', 'DOCTOR_ROLE','USER_ROLE']} />}>
            <Route path="/reserva" element={<ReservaCita />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas para login y loginDoctor sin header, navbar ni footer */}
        <Route path="/loginDoctor" element={<LoginDoctor />} />
      </Routes>
    </Router>
  );
};

export default App;