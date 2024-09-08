/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitterX, BsEnvelope } from 'react-icons/bs';
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
        <Link to="/contact" className="footer-link hover:text-orange-500 font-semibold">Contact</Link>
        <Link to="/faq" className="footer-link hover:text-orange-500 font-semibold">F.A.Q</Link>
        <Link to="/about" className="footer-link hover:text-orange-500 font-semibold">À Propos de Nous</Link>
        <Link to="/pricing" className="footer-link hover:text-orange-500 font-semibold">Tarifs</Link>
        <p className="font-semibold">© {currentYear} Ma Petite Entreprise. Tous droits réservés.</p>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <p className="mr-3 font-semibold">Suivez-nous sur les réseaux</p>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Instagram">
            <BsInstagram size={24} />
          </a>
          <a href="https://www.facebook.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Facebook">
            <BsFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="footer-icon hover:text-orange-500" aria-label="Suivez-nous sur Twitter">
            <BsTwitterX size={24} />
          </a>
          <a href="mailto:contact@example.com" className="footer-icon hover:text-orange-500" aria-label="Envoyez-nous un email">
            <BsEnvelope size={24} />
          </a>
        </div>
        <Link to="/usage-policies" className="font-semibold hover:text-orange-500">Conditions générales d'utilisation</Link>
        <Link to="condifentiality-policies" className="font-semibold mr-2 hover:text-orange-500">Politique de confidentialité</Link>
        <Link to="/legal-notices" className="font-semibold mr-9 hover:text-orange-500">Mentions légales</Link>
      </div>
    </footer>
  );
};

export default Footer;
