/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Section01 from '../../components/team/section01';
import Section02 from '../../components/team/section02';
import Section03 from '../../components/team/section03';
import TeamMembersSection from '../../components/team/TeamMembersSection';

const Team = () => {
  return (
    <div className="font-sans">
      <main className="p-4 pt-14">
        <h1 className="text-center text-4xl font-bold mb-12 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">
          Rencontrez l'équipe de développeurs
        </h1>
        <TeamMembersSection />
        <Section01 />
        <Section02 />
        <Section03 />
      </main>
    </div>
  );
};

export default Team;
