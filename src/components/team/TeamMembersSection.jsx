/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import TeamMember from './teammembers';

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/teams');
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teamMembers.map((member, index) => (
        <div key={member.email} className="relative">
          <TeamMember
            firstname={member.firstname}
            lastname={member.lastname}
            email={member.email}
            github={member.github}
            linkedin={member.linkedin}
            photo={member.photo}
            description={member.description}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamMembersSection;
