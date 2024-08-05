import React from 'react';

const Section2 = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center p-4 lg:flex-row-reverse">
      <div className="lg:w-1/2 p-4 text-justify order-2 lg:order-1">
        <h2 className="text-2xl underline font-bold dark:text-white">Nos Designers</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-400">
          Avec un oeil pour l'esthétique et une attention aux détails, nos designers donnent vie à MPE avec des interfaces intuitives et attrayantes.
        </p>
      </div>
      <div className="lg:w-1/2 p-4 order-1 lg:order-2">
        <img className="w-100 h-90 object-cover rounded-xl" src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nos Designers" />
      </div>
    </section>
  );
};

export default Section2;
