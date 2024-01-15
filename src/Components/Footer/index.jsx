import React from "react";
import "./style.css"

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="logo-container">
        <span className="logo">NewsSite</span>
      </div>
      <div className="social-media">
        <div className="social-link">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <span className="social-title">Facebook</span>
            <i className="bi bi-facebook"></i>
          </a>
        </div>
        <div className="social-link">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <span className="social-title">Twitter</span>
            <i className="bi bi-twitter"></i>
          </a>
        </div>
        <div className="social-link">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <span className="social-title">Instagram</span>
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        {/* Add more social media links/icons as needed */}
      </div>
      <div className="copyright">
        <p>&copy; 2024 NewsSite. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
