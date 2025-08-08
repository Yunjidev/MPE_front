import { useState } from "react";
import Button from "../Button/button"; // Assurez-vous que ce composant Button existe

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/xvgplvar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject,
        message,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative border-form-1 group max-w-4xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-16 rounded-xl shadow-2xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-10 text-white">
            Contactez-nous
          </h2>
          {submitted ? (
            <p className="text-center text-green-400">
              Merci pour votre message! Nous vous répondrons bientôt.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="w-full">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Objet de votre demande"
                  className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div className="w-full">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande"
                  className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="5"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit">Envoyer</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
