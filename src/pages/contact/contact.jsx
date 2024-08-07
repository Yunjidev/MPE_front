/* eslint-disable react/no-unescaped-entities */
// src/pages/Contact.js
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';

const Contact = () => {
  const handleFormSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div className="font-sans">
        <p>Le logo en attendant l'animation</p>
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
