import React, { useState } from "react";
import "./style.css";

const Connect = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo: just show a success message
    setFormStatus("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="connect-container">
      <h1>Connect With Us</h1>
      <p>We’re here to listen, support, and grow together. Reach out anytime!</p>

      <section className="contact-info">
        <div>
          <h2>Contact Info</h2>
          <p><strong>Email:</strong> support@nirvrti.com</p>
          <p><strong>Phone:</strong> XXXXXXXXXX</p>
          <p><strong>Address:</strong> Nirvrti Wellness Center </p>
        </div>

        <div className="social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com/nirvrti" target="_blank" rel="noreferrer" aria-label="Facebook" className="facebook">F</a>
            <a href="https://twitter.com/nirvrti" target="_blank" rel="noreferrer" aria-label="Twitter" className="twitter">T</a>
            <a href="https://instagram.com/nirvrti" target="_blank" rel="noreferrer" aria-label="Instagram" className="instagram">I</a>
            <a href="https://linkedin.com/company/nirvrti" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="linkedin">L</a>
            <a href="https://youtube.com/nirvrti" target="_blank" rel="noreferrer" aria-label="YouTube" className="youtube">Y</a>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input 
            type="text" id="name" name="name" value={formData.name} 
            onChange={handleChange} required placeholder="Your Name" />

          <label htmlFor="email">Email</label>
          <input 
            type="email" id="email" name="email" value={formData.email} 
            onChange={handleChange} required placeholder="Your Email" />

          <label htmlFor="message">Message</label>
          <textarea 
            id="message" name="message" rows="5" value={formData.message} 
            onChange={handleChange} required placeholder="Your Message" />

          <button type="submit">Send Message</button>
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </section>

      <section className="map-section">
        <h2>Our Location</h2>
        <iframe 
          title="Nirvrti Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.684547817026!2d77.00728721507847!3d28.885266982412295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03051734204d%3A0x2714bfe63b44a7d4!2sKurukshetra%2C%20Haryana%2C%20India!5e0!3m2!1sen!2sus!4v1592156758347!5m2!1sen!2sus" 
          width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
      </section>

      <section className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <section className="faq-section">
        <h2>FAQs</h2>
        <details>
          <summary>How can I get professional mental health help?</summary>
          <p>You can consult licensed therapists or psychiatrists in your area or reach out to online counseling services.</p>
        </details>
        <details>
          <summary>Is my information confidential?</summary>
          <p>Yes, all your shared information is treated with strict confidentiality and privacy.</p>
        </details>
        <details>
          <summary>How long will it take to get a response?</summary>
          <p>We usually respond within 24-48 hours on working days.</p>
        </details>
      </section>

      <section className="call-to-action">
        <h2>Want to Help Others?</h2>
        <p>Join our volunteer program or share your story to inspire others. Together, we create a supportive community.</p>
        <button className="volunteer-btn">Join as Volunteer</button>
      </section>
    </main>
  );
};

export default Connect;
