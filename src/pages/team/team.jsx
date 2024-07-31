import React from 'react';
import TeamMember from '../../components/team/teammembers';

const Team = () => {
  const teamMembers = [
    {
      name: 'Thibault Lenormand',
      github: 'https://github.com/ThibaultL24',
      linkedin: 'https://www.linkedin.com/in/thibault-lenormand-b38b96268/',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name: 'Sacha',
      github: 'https://github.com/MacDuPain',
      linkedin: 'https://www.linkedin.com/in/sacha-godel-862a2a300/',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name: 'Thomas',
      github: 'https://github.com/ZealRa',
      linkedin: 'https://www.linkedin.com/in/thomas-bobichon-824b65300/',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name: 'Alexia',
      github: 'https://github.com/alexiacabanel',
      linkedin: 'https://www.linkedin.com/in/alexia-cabanel/',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
  ];

  return (
    <div>
      <h1>Notre Équipe</h1>
      <div>
        {teamMembers.map((member, index) => (
          <TeamMember 
            key={index} 
            name={member.name} 
            github={member.github} 
            linkedin={member.linkedin} 
            avatar={member.avatar} 
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
