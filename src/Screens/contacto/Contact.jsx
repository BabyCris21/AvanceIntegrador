import React from 'react'
import './Contact.css';


const Contact = () => {
  return (
   <div className="contact-container">
       <section className="contacto-section">
        <div className="contact-map">
          <h3>UBICACION POR MAPA</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.4854364329476!2d-75.73187798520203!3d-14.073282890007251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e3310f4d14b7%3A0x7628dfbff8ae858d!2sHospital%20Regional%20de%20Ica!5e0!3m2!1ses-419!2spe!4v1686769802470!5m2!1ses-419!2spe"
            width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="contacto-info">
          <div className="contacto-card">
            <h3>EMERGENCIA</h3>
            <p>(237) 681-812-255</p>
            <p>(237) 666-331-894</p>
          </div>
          <div className="contacto-card">
            <h3>UBICACIÓN</h3>
            <p>0123 Algún lugar</p>
            <p>9876 Algún país</p>
          </div>
          <div className="contacto-card">
            <h3>EMAIL</h3>
            <p>fildineeesoe@gmail.com</p>
            <p>myebstudios@gmail.com</p>
          </div>
          <div className="contacto-card">
            <h3>HORARIO DE ATENCIÓN</h3>
            <p>Lun-Sáb 09:00-20:00</p>
            <p>Domingo Solo Emergencias</p>
          </div>
        </div>
      </section> 
    </div>
  )
}

export default Contact