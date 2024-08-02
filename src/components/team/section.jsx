import React from 'react';

const Section = ({ title, content, image, alternate }) => {
  return (
    <section className={`flex flex-col lg:flex-row items-center p-4 ${alternate ? 'lg:flex-row-reverse' : ''}`}>
      <div className="lg:w-1/2 p-4 text-center order-2 lg:order-1">
        <h2 className="text-2xl underline font-bold dark:text-white">{title}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{content}</p>
      </div>
      {image && (
        <div className="lg:w-1/2 p-4 order-1 lg:order-2">
          <img className="w-80 h-60 object-cover rounded-lg" src={image} alt={title} />
        </div>
      )}
    </section>
  );
};

export default Section;
