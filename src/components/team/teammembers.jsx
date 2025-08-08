/* eslint-disable react/prop-types */
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrMail } from "react-icons/gr";


const TeamMember = ({ firstname, lastname, email, github, linkedin, photo, description }) => {
  const imageUrl = photo || 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <div className="card text-center text-white items-center p-4 border-none ">
      <img className="inline-block w-24 h-24 rounded-full" src={imageUrl} alt={`${firstname} ${lastname}`} />
      <h3 className="mt-2 font-semibold text-l">{firstname} {lastname}</h3>
      <p className="mt-2 text-white-800">{description}</p>
      <div className="flex justify-center space-x-4 mt-2">
        {github && (
          <a href={github} className="text-gray-400 hover:text-orange-300" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} className="text-gray-400 hover:text-orange-300" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        )}
      {email && (
          <a href={`mailto:${email}`} className="text-gray-400 hover:text-orange-300">
            <GrMail size={24} />
          </a>
        )}
      </div>
    </div>
  );
};


export default TeamMember;
