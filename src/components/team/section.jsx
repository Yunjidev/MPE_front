import React from 'react';

const Section = ({ title, content, image, alternate }) => {
  return (
    <section className={`flex flex-col lg:flex-row items-center p-4 ${alternate ? 'lg:flex-row-reverse' : ''}`}>
      <div className="lg:w-1/2">
        <h2 className="text-2xl text-decoration-line: underline font-bold">{title}</h2>
        <p className="mt-2 text-white-700">{content}</p>
      </div>
      {image && <img className="lg:w-1/2 mt-4 lg:mt-0" src={image} alt={title} />}
    </section>
  );
};

export default Section;