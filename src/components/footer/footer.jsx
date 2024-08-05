import React from 'react';
import "./footer.css"
import { BsInstagram, BsWhatsapp, BsFacebook, BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer flex justify-between items-center p-4 w-full">
      <div className="flex-1"></div>

      <div className="flex flex-col items-center">
        <a href="http://localhost:5173/contact" className="footer-link">Contact</a>
        <a href="http://localhost:5173/faq" className="footer-link">F.A.Q</a>
        <a href="http://localhost:5173/team" className="footer-link">L'équipe</a>
        <p>Prix</p>
        <p>© 2024 MaPetiteEntreprise. Tout droits réservés.</p>
      </div>

      <div className="flex flex-col items-end flex-1 mr-5">
        <p className="mr-3">Suivez-nous sur les réseaux</p>
        <div className="flex space-x-4 mr-4">
          <BsInstagram size={24} />
          <BsWhatsapp size={24} />
          <BsFacebook size={24} />
          <BsTwitterX size={24} />
        </div>
        <p>Conditions générales de vente</p>
        <p className="mr-2">Politique de confidentialité</p>
        <p className="mr-9">Mentions légales</p>
      </div>
    </footer>
  );
};

export default Footer;
