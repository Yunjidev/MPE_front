import React from 'react';

const Section3 = () => {

return (
  <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-[5%] mt-16 lg:flex-row-reverse">
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4 md:flex-row md:order-2">
      <div className="flex flex-col justify-center max-w-[1000px]">
        <h2 className="text-2xl underline font-bold dark:text-white">
          <span className="text-2xl underline font-bold dark:text-white">Notre Equipe de support</span>
          <br />
          <span className="block h-1 bg-orange-500 transform scale-x-0 origin-bottom-right transition-transform duration-150 ease-out hover:scale-x-100 origin-bottom-left absolute bottom-0 left-0"></span>
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-400">
        Toujours prêts à aider, nos spécialistes du support technique sont là pour vous assurer que votre expérience avec MPE est sans souci.
        </p>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center p-4 md:flex-col md:items-center md:order-1">
    <img className="w-100 h-90 object-cover rounded-xl" 
    src="https://images.unsplash.com/photo-1578402027014-8adededc0fac?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Notre Équipe de Support" 
    />
    </div>
  </section>
);
}

export default Section3;
