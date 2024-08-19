/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import SocialLinks from '../SocialLinks/sociallinks';

const UserChoiceModal = () => {
  const navigate = useNavigate();
  const { setUserType } = useModal();

  const handleChoice = (choice) => {
    setUserType(choice);

    // Navigation en fonction du choix
    if (choice === 'client') {
      navigate('/home-client');
    } else if (choice === 'enterprise') {
      navigate('/home-enterprise');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative border-form-1 group">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 rounded-xl pt-12 shadow-2xl w-80 h-60 relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-10 text-white">Êtes-vous particulier ou professionnel ?</h2>
          <div className="w-80 flex justify-evenly">
            <button 
              className="flex items-center justify-center w-28 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-violet-400 hover:via-orange-400 hover:to-green-300 hover:text-black text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
              onClick={() => handleChoice('client')}
            >
              Particulier
            </button>
            <button 
              className="flex items-center justify-center w-28 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-violet-400 hover:via-orange-400 hover:to-green-300 hover:text-black text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
              onClick={() => handleChoice('enterprise')}
            >
              Professionnel
            </button>
          </div>
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};

export default UserChoiceModal;
