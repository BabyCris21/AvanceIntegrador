import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Screens/Home";
import Staff from './Screens/Staff';
import Registro from "./Screens/Registro";
import Login from './Screens/Login';
import Contact from "./Screens/Contact"; 
import Nosotros from "./Screens/Nosotros";
import Servicios from './Screens/Servicios';
import Admin from './Screens/Admin';
import Header from './components/Header';


import Citas from "./Screens/Citas";
import Perfil from './Screens/Perfil';



function App() {
  return (
    <div className="">
      <Router>
        <Header></Header>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/staff" element={<Staff/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/citas" element={<Citas/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
