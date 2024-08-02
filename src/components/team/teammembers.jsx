import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrMail } from "react-icons/gr";


const TeamMember = ({ firstname, lastname, email, github, linkedin, photo, description }) => {
  return (
    <div className="card text-center items-center p-4 border-none ">
      <img className="inline-block w-24 h-24 rounded-full" src={photo} alt={`${firstname} ${lastname}`} />
      <h3 className="mt-2 font-semibold text-l">{firstname} {lastname}</h3>
      <p className="mt-2 text-white-800">{description}</p>
      <div className="flex justify-center space-x-4 mt-2">
        {github && (
          <a href={github} className="text-gray-600 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} className="text-gray-600 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        )}
      {email && (
          <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-800">
            <GrMail size={24} />
          </a>
        )}
      </div>
    </div>
  );
};


export default TeamMember;
