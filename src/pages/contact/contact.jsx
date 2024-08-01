// src/pages/Contact.js
import React from 'react';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';

const Contact = () => {
  const handleFormSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div className="font-sans">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Logo en attendant l'animation</div>
        </div>
      </nav>
      <main className="p-4">
        <div className="flex justify-between">
          <div className="w-1/2">
            <img
              src="/assets/img/logo.png"
              alt="Logo"
              className="w-32 h-32"
            />
          </div>
          <div className="w-1/2">
            <ContactInfo />
          </div>
        </div>
        <div className="mt-8">
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </main>
    </div>
  );
};

export default Contact;
