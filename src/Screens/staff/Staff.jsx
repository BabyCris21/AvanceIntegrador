import React from 'react';
import "./Staff.css";
import ContactNews from '../sliders/ContactNews';

const Staff = () => {
  const medicalStaff = [
    { id: 1, name: "Dr. Juan Ramirez", specialization: "Cardiología", photo: "https://st3.depositphotos.com/1743476/32257/i/450/depositphotos_322579018-stock-photo-smiling-doctor-standing-on-grey.jpg" },
    { id: 2, name: "Dra. María Perez", specialization: "Pediatría", photo: "https://media.istockphoto.com/id/1530248128/photo/portrait-of-cheerful-female-doctor-with-digital-tablet-beside-window-in-corridor.webp?b=1&s=170667a&w=0&k=20&c=lr9kQSJFSMXao-_XHEyTjca6fhzdoIg9lDdOL8j-kHE=" },
    { id: 3, name: "Dr. José Rodríguez", specialization: "Dermatología", photo: "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg" },
    { id: 4, name: "Dra. Ana Martínez", specialization: "Ginecología", photo: "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg" },
    { id: 5, name: "Dr. Carlos Sánchez", specialization: "Oftalmología", photo: "https://st2.depositphotos.com/4431055/11852/i/450/depositphotos_118522306-stock-photo-handsome-doctor-portrait.jpg" },
    { id: 6, name: "Dra. Laura López", specialization: "Neurología", photo: "https://img.freepik.com/foto-gratis/doctora-vistiendo-bata-laboratorio-estetoscopio-aislado_1303-29791.jpg" },
    { id: 7, name: "Dr. Carlos Sánchez", specialization: "Cirugía", photo: "https://st2.depositphotos.com/4431055/11852/i/450/depositphotos_118522306-stock-photo-handsome-doctor-portrait.jpg" },
    { id: 8, name: "Dra. Laura López", specialization: "Geriatría", photo: "https://img.freepik.com/foto-gratis/doctora-vistiendo-bata-laboratorio-estetoscopio-aislado_1303-29791.jpg" },
    { id: 9, name: "Dr. Carlos Sánchez", specialization: "Otorrinolaringología", photo: "https://st2.depositphotos.com/4431055/11852/i/450/depositphotos_118522306-stock-photo-handsome-doctor-portrait.jpg" },
  ];

  return (
    <div>
      <section className="staff-top-section">
        <div className="company-info">
          <h1>Nuestros Doctores</h1>
          <p>Cuidamos tu salud. Líderes en la excelencia médica</p>
        </div>
      </section>

      <div className="staff-container">
        <div className="staff-list">
          {medicalStaff.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.photo} alt={doctor.name} />
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/feed/"><i className="fab fa-linkedin"></i></a>
                  <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                  <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
                </div>
              </div> 
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </div>

      <ContactNews/> 
    </div>
  );
}
export default Staff;