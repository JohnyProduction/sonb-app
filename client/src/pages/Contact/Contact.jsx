import {React,useState} from "react";
import "./Contact.css"
export default function Contact() {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      };
    
      return (
        <div className="contact-form">
          <h2>Kontakt</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="contact-label" htmlFor="name">Imię:</label>
              <input className="contact-input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="contact-label" htmlFor="email">Email:</label>
              <input className="contact-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label className="contact-label" htmlFor="message">Wiadomość:</label>
              <textarea className="contact-textarea" id="message" name="message" value={formData.message} onChange={handleChange}required></textarea>
            </div>
            <button className="contact-button" type="submit">Wyślij</button>
          </form>
        </div>
      );
}