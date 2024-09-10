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
    <footer className="text-white bg-footer h-72 border-t border-neutral-700 border-neutral-400 flex justify-between items-center p-4 w-full">
      <div className="flex-1 flex justify-center">
        <img src={Logo} className='h-56' alt="Logo de Ma Petite Entreprise" />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <Link to="/contact" className="footer-link hover:text-orange-500 font-semibold mb-2">Nous Contacter</Link>
        <Link to="/usage-policies" className="font-semibold hover:text-orange-500 mb-2">Conditions générales d'utilisation</Link>
        <Link to="condifentiality-policies" className="font-semibold hover:text-orange-500 mb-2">Politique de confidentialité</Link>
        <Link to="/legal-notices" className="font-semibold hover:text-orange-500">Mentions légales</Link>
        <p className="font-semibold mt-6">© {currentYear} Ma Petite Entreprise. Tous droits réservés.</p>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <p className="mr-3 text-xl font-semibold mb-4">Suivez-nous sur les réseaux</p>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" className="footer-icon hover:text-orange-500 mb-2" aria-label="Suivez-nous sur Instagram">
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
    </footer>
  );
};

export default Footer;
