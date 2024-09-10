import { BsInstagram, BsFacebook, BsTwitterX, BsLinkedin } from 'react-icons/bs';
import ParticlesDemo from '../ParticlesDemo';

const SocialLinks = () => {
  return (
    <div>
      <section className="w-16 h-screen bg-transparent fixed top-0 right-0 flex flex-col justify-center items-center hidden sm:flex">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 text-white hover:text-[#67FFCC] transition"
          aria-label="Compte X"
          id="twitter-link"
        >
          <BsTwitterX className="text-2xl" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 text-white hover:text-[#67FFCC] transition"
          aria-label="Compte Instagram"
          id="instagram-link"
        >
          <BsInstagram className="text-2xl" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 text-white hover:text-[#67FFCC] transition"
          aria-label="Compte Instagram"
          id="instagram-link"
        >
          <BsFacebook className="text-2xl" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 text-white hover:text-[#67FFCC] transition"
          aria-label="Compte Instagram"
          id="instagram-link"
        >
          <BsLinkedin className="text-2xl" />
        </a>
      </section>
      <ParticlesDemo isDarkMode={true} />
    </div>
  );
};

export default SocialLinks;
