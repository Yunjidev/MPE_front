import React from 'react';

const Section1 = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-[5%] mt-16">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <h2 className="text-2xl underline font-bold dark:text-white">Nos Développeurs</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-400">
          Chez MPE, nous croyons que la technologie doit enrichir la vie de chacun. C’est avec cette vision que notre équipe de développement dévouée a créé Ma Petite Entreprise, une application conçue pour simplifier le quotidien des micro-entreprises. Des architectes de l'innovation, nos développeurs combinent expertise technique et créativité pour transformer des idées complexes en réalités conviviales.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
      <img className="w-100 h-90 object-cover rounded-xl" 
      src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Nos Développeurs" 
      />
      </div>
    </section>
  );
};

export default Section1;
