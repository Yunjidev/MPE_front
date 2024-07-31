import React from 'react';

const TeamMember = ({ name, github, linkedin, avatar }) => {
  return (
    <div className="text-center">
      <img className="inline-block w-[62px] h-[62px] rounded-full" src={avatar} alt={`${name}'s avatar`} />
      <h3 className="mt-2 font-semibold">{name}</h3>
      <div className="flex justify-center space-x-2 mt-1">
        {github && <a href={github} className="text-gray-600 hover:text-gray-800"><i className="fab fa-github"></i></a>}
        {linkedin && <a href={linkedin} className="text-gray-600 hover:text-gray-800"><i className="fab fa-linkedin"></i></a>}
      </div>
    </div>
  );
};

export default TeamMember;