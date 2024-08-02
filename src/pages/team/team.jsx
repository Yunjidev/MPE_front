import React, { useEffect, useState } from 'react';
import TeamMember from '../../components/team/teammembers';
import Section from '../../components/team/section';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const sections = [
    {
      title: 'Nos Développeurs',
      content: "Chez MPE, nous croyons que la technologie doit enrichir la vie de chacun. C’est avec cette vision que notre équipe de développement dévouée a créé Ma Petite Entreprise, une application conçue pour simplifier le quotidien des micro-entreprises. Des architectes de l'innovation, nos développeurs combinent expertise technique et créativité pour transformer des idées complexes en réalités conviviales.",
      image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Nos Designers',
      content: "Avec un oeil pour l'esthétique et une attention aux détails, nos designers donnent vie à MPE avec des interfaces intuitives et attrayantes.",
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Notre Équipe de Support',
      content: "Toujours prêts à aider, nos spécialistes du support technique sont là pour vous assurer que votre expérience avec MPE est sans souci.",
      image: 'https://images.unsplash.com/photo-1578402027014-8adededc0fac?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Notre Mission',
      content: "Ensemble, nous travaillons à vous apporter une application qui non seulement répond à vos besoins mais les anticipe. Nous sommes fiers de vous présenter MPE et nous espérons qu'elle vous apportera autant de satisfaction qu'à nous lors de sa création.",
    },
  ];

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
  

  
  return (
    <div className="font-sans">
      <main className="p-4">
        <h1 className="text-center text-3xl font-bold mb-4">Rencontrez l'équipe de développeurs</h1>
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
                <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
        {sections.map((section, index) => (
          <Section
            key={section.title}
            {...section}
            alternate={index % 2 !== 0}
          />
        ))}
      </main>
    </div>
  );
};

export default Team;
