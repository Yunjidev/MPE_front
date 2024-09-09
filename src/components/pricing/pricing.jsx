import { RxRocket } from "react-icons/rx";
import { Link } from 'react-router-dom';
import './pricing.css';

export default function Pricing() {

    const plans1 = [
        {
            name: "Basique",
            desc: "Découvrez notre solution basique pour faire connaître votre entreprise",
            price: "0€",
            isMostPop: false,
            features: [
                "Possibilité de créer son entreprise",
                "Page d'entreprise",
                "Statistiques détaillées",
                "Dashboard entreprise",
            ],
        },
    ];

    const plans2 = [
        {
            name: "Mensuel",
            desc: "Profitez de notre solution mensuelle pour profiter de plus de services.",
            price: "35€",
            isMostPop: true,
            features: [
                "Possibilité de créer son entreprise",
                "Page d'entreprise",
                "Statistiques détaillées",
                "Dashboard entreprise",
                "Mise en avant sur l'accueil",
                "Priorisation dans les recherches",
                "Certification Premium",
                "Galerie Photo",
                "Calendrier + Réservations",
            ],
        },
    ];

    const plans3 = [
        {
            name: "Annuel",
            desc: "Optez pour notre solution annuelle pour avoir 2 mois offerts.",
            price: "350€",
            isMostPop: false,
            features: [
                "Possibilité de créer son entreprise",
                "Page d'entreprise",
                "Statistiques détaillées",
                "Dashboard entreprise",
                "Mise en avant sur l'accueil",
                "Priorisation dans les recherches",
                "Certification Premium",
                "Galerie Photo",
                "Calendrier + Réservations",
            ],
        },
    ];

    return (
        <section className='py-14 mt-12'>
            <div className="max-w-screen-xl mx-auto px-4 text-white md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text text-3xl font-bold sm:text-4xl text-center'>
                        Nos offres Premium
                    </h3>
                    <div className='mt-3 max-w-xl text-center'>
                        <p className='text-white font-semibold'>
                            Profitez de nos fonctionnalités exclusives de mise en avant de votre activité et de tous les outils supplémentaires.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans1.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-transparent bg-neutral-900/75 border-2 border-[#67FFCC] shadow-lg neon-vert hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {item.isMostPop ? (
                                    <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-green-400 text-center text-black text-sm font-semibold">Le + populaire</span>
                                ) : ""}
                                <div className="p-8 space-y-4 text-center">
                                    <span className='text-[#67FFCC] font-bold text-4xl flex justify-evenly items-center'>
                                        {item.name}
                                    </span>
                                    <div className='text-white text-5xl font-semibold'>
                                        {item.price} <span className="text-xl text-white font-normal">/mois</span>
                                    </div>
                                    <p className='text-white'>
                                        {item.desc}
                                    </p>
                                </div>
                                <ul className='p-8 space-y-3 flex-grow'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-5 w-5 text-green-200'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" fill="none"></circle>
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clipRule='evenodd'></path>
                                                </svg>
                                                <span className='text-white'>{featureItem}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="p-8 pt-0 flex flex-col items-center">
                                    <Link to='/pricing' className='px-6 py-3 text-center rounded-lg w-4/5 font-semibold text-sm duration-150 text-black bg-[#67FFCC] hover:bg-green-300 active:bg-green-700'>
                                        Découvrir
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                    {
                        plans2.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-neutral-900/75 border-4 border-orange-400 shadow-lg neon-orange hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {item.isMostPop ? (
                                    <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-orange-400 text-center text-black text-sm font-semibold">Le + populaire</span>
                                ) : ""}
                                <div className="p-8 space-y-4 text-center">
                                    <span className='text-orange-400 font-bold text-4xl'>
                                        {item.name}
                                    </span>
                                    <div className='text-white text-5xl font-semibold'>
                                        {item.price} <span className="text-xl text-white font-normal">/mois</span>
                                    </div>
                                    <p className='text-white'>
                                        {item.desc}
                                    </p>
                                </div>
                                <ul className='p-8 space-y-3 flex-grow'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-5 w-5 text-orange-400'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" fill="none"></circle>
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clipRule='evenodd'></path>
                                                </svg>
                                                <span className='text-white'>{featureItem}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="p-8 pt-0 flex flex-col items-center">
                                    <Link to='/pricing' className='px-6 py-3 text-center rounded-lg w-4/5 font-semibold text-sm duration-150 text-black bg-orange-400 hover:bg-orange-500 active:bg-orange-400'>
                                        Découvrir
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                    {
                        plans3.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-neutral-900/75 border-2 border-violet-400 shadow-lg neon-violet hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {item.isMostPop ? (
                                    <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-orange-400 text-center text-black text-sm font-semibold">Le + populaire</span>
                                ) : ""}
                                <div className="p-8 space-y-4 text-center">
                                    <span className='text-violet-400 font-bold text-4xl flex justify-evenly items-center'>
                                        <RxRocket /> {item.name}
                                    </span>
                                    <div className='text-white text-5xl font-semibold'>
                                        {item.price} <span className="text-xl text-white font-normal">/an</span>
                                    </div>
                                    <p className='text-white'>
                                        {item.desc}
                                    </p>
                                </div>
                                <ul className='p-8 space-y-3 flex-grow'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-5 w-5 text-violet-400'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" fill="none"></circle>
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clipRule='evenodd'></path>
                                                </svg>
                                                <span className='text-white'>{featureItem}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="p-8 pt-0 flex flex-col items-center">
                                    <Link to='/pricing' className='px-6 py-3 text-center rounded-lg w-4/5 font-semibold text-sm duration-150 text-black bg-violet-400 hover:bg-violet-500 active:bg-violet-400'>
                                        Découvrir
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}