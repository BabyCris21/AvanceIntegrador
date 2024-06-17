import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Asegúrate de importar Outlet
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
import RegistroDoctor from './Screens/RegistroDoctor';


function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          {/* Rutas con header, navbar y footer */}
          <Route
            path="/"
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/perfildoctor" element={<PerfilDoctor />} />
            <Route path="/reserva" element={<ReservaCita />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas para login y loginDoctor sin header, navbar ni footer */}
   
          <Route path="/loginDoctor" element={<LoginDoctor />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
