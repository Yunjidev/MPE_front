import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section className="fixed max-w-2xl items-center p-4 mx-auto md:gap-x-4 left-1/2 transform -translate-x-1/2 bottom-2 bg-neutral-900/75 md:flex md:items-center border border-white-700 rounded-2xl z-50">
      <div className="flex items-center gap-x-4">
        <span className="inline-flex p-2 text-white-500 rounded-lg shrink-0 bg-orange-500 white: bg-emerald-400/80">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <p className="text-sm text-gray-300">
          Nous utilisons des cookies pour vous garantir la meilleure expérience
          sur notre site web.{" "}
          <a href="/cookie-policies" className="text-blue-500 hover:underline">
            Lisez notre politique de cookies
          </a>
          .
        </p>
      </div>

      <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
        <button
          className="text-xs w-1/2 md:w-auto font-medium bg-orange-500 rounded-lg hover:bg-orange-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
          onClick={handleAcceptAll}
        >
          Accepter tous les cookies
        </button>
      </div>
    </section>
  );
};

export default CookieBanner;
