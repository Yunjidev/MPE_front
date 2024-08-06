<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import TeamMember from '../../components/team/teammembers';
import Section01 from '../../components/team/section01';
import Section02 from '../../components/team/section02';
import Section03 from '../../components/team/section03';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

=======
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Section01 from '../../components/team/section01';
import Section02 from '../../components/team/section02';
import Section03 from '../../components/team/section03';
// import TeamMember from '../../components/team/teammembers'; // Commenter l'importation

const Team = () => {
  // const [teamMembers, setTeamMembers] = useState([]); // Désactiver l'état des membres de l'équipe
>>>>>>> 8187ce07faa0e55a15a7367d7c858b524bfdb973

  /*
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/team');
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
  
    fetchTeamMembers();
  }, []);
  */
  
  return (
    <div className="font-sans">
      <main className="p-4 pt-14">
<<<<<<< HEAD
        <h1 className="text-6xl text-center dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800  text-transparent bg-clip-text mb-8">Rencontrez l'équipe de développeurs</h1>
=======
        <h1 className="text-center text-4xl font-bold mb-4 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">Rencontrez l'équipe de développeurs</h1>
        {/*
>>>>>>> 8187ce07faa0e55a15a7367d7c858b524bfdb973
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
              {index < teamMembers.length - 1 && (
                <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-gray-300 dark:bg-gray-600"></div>
              )}
            </div>
          ))}
        </div>
<<<<<<< HEAD
        <Section01 />
        <Section02 />
        <Section03 />
        <div className="text-center mt-8">
          <h2 className="text-2xl underline font-bold mb-4 dark:text-white">Notre mission</h2>
          <p className="text-lg dark:text-gray-400">Ensemble, nous travaillons à vous apporter une application qui non seulement répond à vos besoins mais les anticipe. Nous sommes fiers de vous présenter MPE et nous espérons qu'elle vous apportera autant de satisfaction qu'à nous lors de sa création.</p>
        </div>
=======
        */}
        <Section01 />
        <Section02 />
        <Section03 />
>>>>>>> 8187ce07faa0e55a15a7367d7c858b524bfdb973
      </main>
    </div>
  );
};

export default Team;
