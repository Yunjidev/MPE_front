import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamMember = ({ firstname, lastname, email, github, linkedin, avatar, description }) => {
  return (
    <div className="text-center p-4 border rounded-lg shadow-lg">
      <img className="inline-block w-24 h-24 rounded-full" src={avatar} alt={`${firstname} ${lastname}'s avatar`} />
      <h3 className="mt-2 font-semibold text-xl">{firstname} {lastname}</h3>
      <p className="text-white-600">{email}</p>
      <p className="mt-2 text-white-800">{description}</p>
      <div className="flex justify-center space-x-4 mt-2">
        {github && (
          <a href={github} className="text-gray-600 hover:text-gray-800">
            <FaGithub size={24} />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} className="text-gray-600 hover:text-gray-800">
            <FaLinkedin size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
