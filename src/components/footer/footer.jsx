import React from 'react';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer flex justify-center">
        <div className="flex flex-col">
            <p>Contact</p>
            <p>F.A.Q</p>
            <p>L'équipe</p>
            <p>Prix</p>
            <p>© 2024 My Website. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
