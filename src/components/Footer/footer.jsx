/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitterX, BsLinkedin } from 'react-icons/bs';
import "./footer.css";
import Logo from '../../assets/image.png'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-white bg-footer border-t border-neutral-700 p-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start h-full gap-y-8">
        
        {/* Logo Section */}
        <div className="flex-1 flex justify-center md:justify-start">
          <img src={Logo} className="h-36 md:h-56 object-contain" alt="Logo de Ma Petite Entreprise" />
        </div>

        {/* Links Section */}
        <div className="flex-1 flex flex-col items-center text-center">
          <Link to="/contact" className="footer-link hover:text-orange-500 font-semibold mb-2">Nous Contacter</Link>
          <Link to="/usage-policies" className="font-semibold hover:text-orange-500 mb-2">Conditions générales d'utilisation</Link>
          <Link to="/condifentiality-policies" className="font-semibold hover:text-orange-500 mb-2">Politique de confidentialité</Link>
          <Link to="/legal-notices" className="font-semibold hover:text-orange-500">Mentions légales</Link>
          <p className="font-semibold mt-6">© {currentYear} Ma Petite Entreprise. Tous droits réservés.</p>
        </div>

        {/* Social Media Section */}
        <div className="flex-1 flex flex-col items-center">
          <p className="text-xl font-semibold mb-4 text-center">Suivez-nous sur les réseaux</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Instagram">
              <BsInstagram size={32} />
            </a>
            <a href="https://www.facebook.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Facebook">
              <BsFacebook size={32} />
            </a>
            <a href="https://twitter.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Twitter">
              <BsTwitterX size={32} />
            </a>
            <a href="mailto:contact@example.com" className="footer-icon hover:text-orange-500" aria-label="Envoyez-nous un email">
              <BsLinkedin size={32} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
