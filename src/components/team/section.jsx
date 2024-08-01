import React from 'react';

const Section = ({ title, content, image, alternate }) => {
  return (
    <section className={`flex flex-col lg:flex-row items-center p-4 ${alternate ? 'lg:flex-row-reverse' : ''}`}>
      <div className="lg:w-1/2 p-4 text-center">
        <h2 className="text-2xl text-decoration-line: underline font-bold">{title}</h2>
        <p className="mt-2 text-white-700">{content}</p>
      </div>
      {image && (
        <div className="lg:w-1/2 lg:p-4">
          <img className="lg:w-1/2 mt-4 lg:mt-0 w-full h-auto" src={image} alt={title} />
        </div>
          )}
    </section>
  );
};

export default Section;