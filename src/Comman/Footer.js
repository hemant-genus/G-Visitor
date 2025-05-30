import React from 'react';
import './Footer.css'; // Optional: For styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Genus. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
