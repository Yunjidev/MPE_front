import React from 'react';
import TeamMember from '../../components/team/teammembers';
import Section from '../../components/team/section';

const Team = () => {
  const teamMembers = [
    {
      name: 'Thibault',
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
    {
      name:'Nico',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name:'Alexis',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name:'Winny',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    {
      name:'Florian',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    }
  ];

  const sections = [
    {
      title: 'Nos Développeurs',
      content: "Chez MPE, nous croyons que la technologie doit enrichir la vie de chacun. C’est avec cette vision que notre équipe de développement dévouée a créé Ma Petite Entreprise, une application conçue pour simplifier le quotidien des micro-entreprises.Des architectes de l'innovation, nos développeurs combinent expertise technique et créativité pour transformer des idées complexes en réalités conviviales.",
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

  return (
    <div className="font-sans">
      <main className="p-4">
        <h1 className="text-center text-3xl font-bold mb-4">Rencontrez l'équipe de développeurs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map(member => (
            <TeamMember key={member.name} {...member}  />
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
