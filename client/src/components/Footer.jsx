import React from 'react';
import './Footer.css'; // Don't forget to import the CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <h2>Adhamkhor</h2>
          <p>Adhamkhor is your one-stop platform for full-stack learning and services.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@adhamkhor.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: New Delhi, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Adhamkhor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
