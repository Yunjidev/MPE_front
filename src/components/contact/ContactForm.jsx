// src/components/contact/ContactForm.js
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/button"; // Assurez-vous que ce composant Button existe
import './form.css';

export default function ContactForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ email, subject, message });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative border-form-1 group">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-16 rounded-xl shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-10 text-white">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet de votre demande"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez votre demande"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="5"
              />
            </div>
            <Button type="submit">Envoyer</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
