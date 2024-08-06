import React, { useState } from "react";
import './pricing_page.css';

const PricingPage = () => {
    const checkIcon = (
        <svg className="w-5 h-5 mx-auto text-green-400 items-center" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
        </svg>
    );

    const minusIcon = (
        <svg className="w-5 h-5 mx-auto text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" />
        </svg>
    );

    const plans = [
        {
            name: "Basic",
            desc: "Découvrez notre solution basique pour votre entreprise.",
            price: "15€",
            color: "text-green-300 ",
            buttonColor: "bg-green-300 hover:bg-green-500 active:bg-green-600"
        },
        {
            name: "Business",
            desc: "Profitez de notre solution mensuelle pour plus de services.",
            price: "20€",
            color: "text-orange-400",
            buttonColor: "bg-orange-400 hover:bg-orange-500 active:bg-orange-600"
        },
        {
            name: "Enterprise",
            desc: "Optez pour notre solution annuelle pour avoir 2 mois offerts.",
            price: "50€",
            color: "text-violet-400",
            buttonColor: "bg-violet-400 hover:bg-violet-500 active:bg-violet-600"
        },
    ];

    const tables = [
        {
            label: "Features",
            label_icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            items: [
                {
                    name: "Possibilité de créer son entreprise",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Page d'entreprise",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Statistiques détaillées",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Dashboard entreprise",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Mise en avant sur l'accueil",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Priorisation dans les recherches",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Certification Premium",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Galerie Photo",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Calendrier + Réservations",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
            ]
        }
    ];

    const [selectedPlan, setSelectedPlan] = useState(plans[0].name);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mt-8 dark:text-white gradient-text-orange">Notre formule premium</h1>

                <div className="container mx-auto flex flex-col justify-around lg:flex-row items-center py-8 px-4 lg:py-16">
                    <img src="public/assets/img/logo.png" alt="Image 1" className="w-6/12" />
                    <div className="md:ml-8 mt-4 md:mt-0">
                        <p className="lg:text-2xl md:text-xl lg:mx-6 dark:text-white">
                            Profitez de toutes les fonctionnalités proposées par MPE à un tarif avantageux pour une durée choisie.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row justify-start items-center py-8 px-4 lg:py-16">
                    <img src="public/assets/img/decouvrez.png" alt="Image 2" className="w-5/12 mt-8 lg:mt-0 lg:mr-8 order-first lg:order-last rounded-lg" />
                    <div className="md:ml-8 mt-4 md:mt-0 flex flex-col lg:items-start lg:text-left">
                        <h1 className="text-4xl mb-12 lg:ml-6 gradient-text-violet">Mise en avant de votre entreprise</h1>
                        <p className="lg:text-2xl md:text-xl lg:mx-6 dark:text-white">
                            Augmentez votre chiffre d’affaires en apparaissant dans les premiers résultats de recherche d’un utilisateur. Votre entreprise sera également affichée sur la page d’accueil.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto flex flex-col justify-around lg:flex-row items-center py-8 px-4 lg:py-16">
                    <img src="public/assets/img/vector.png" alt="Image 3" className="w-7/12 rounded-lg" />
                    <div className="md:ml-8 mt-4 md:mt-0 lg:w-1/2">
                        <p className="lg:text-3xl md:text-xl lg:mx-6 dark:text-white">
                            Profitez de toutes les fonctionnalités proposées par MPE à un tarif avantageux pour une durée choisie.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row justify-start items-center py-8 px-4 lg:py-16">
                    <img src="public/assets/img/decouvrez.png" alt="Image 4" className="w-5/12 mt-8 lg:mt-0 lg:mr-8 order-first lg:order-last rounded-lg" />
                    <div className="md:ml-8 mt-4 md:mt-0 flex flex-col lg:items-start lg:text-left">
                        <h1 className="text-4xl mb-12 lg:ml-6 gradient-text-green">Organisez l’activité de votre entreprise</h1>
                        <p className="lg:text-2xl md:text-xl lg:mx-6 dark:text-white">
                            Le dashboard administrateur mit à votre disposition permet d’avoir un regard précis sur le nombre de passage de clients sur votre page, les rendez-vous, demande de contact,...
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-center mt-8 dark:text-white">Comparez nos formules</h2>
            </div>

            <section className="py-14">
                <div className="">
                    <div className="mt-16">
                        <div className="top-0">
                            <div className="max-w-screen-xl mx-auto">
                                <ul className="flex flex-wrap justify-center items-center gap-x-6 px-4 md:px-8">
                                    <li className="flex justify-center w-full lg:w-auto">
                                        <img src="public/assets/img/logo.png" alt="Logo" className="w-36 lg:w-48" />
                                    </li>
                                    {plans.map((item, idx) => (
                                        <li key={idx} className={`space-y-4 w-full lg:w-1/5 ${item.name !== selectedPlan ? "hidden lg:block" : ""}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="relative lg:hidden">
                                                    <select
                                                        value={selectedPlan}
                                                        className="bg-gray-900 appearance-none outline-none px-4 py-2 cursor-pointer dark:bg-gray-700 dark:text-white"
                                                        onChange={(e) => setSelectedPlan(e.target.value)}
                                                    >
                                                        {plans.map((option, idx) => (
                                                            <option key={idx} value={option.name}>
                                                                {option.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={`${item.color} text-2xl font-semibold flex flex-col py-6`}>
                                                <span>{item.name}</span>
                                                <span className="text-lg font-normal">{item.price}/mois</span>
                                            </div>
                                            <p className="text-sm dark:text-white py-4">{item.desc}</p>
                                            <button className={`px-4 py-3 rounded-lg w-full font-semibold text-base duration-150 text-black  ${item.buttonColor}`}>
                                                Get Started
                                            </button>
                                        </li>
                                    ))}
                                </ul>



                            </div>
                        </div>
                        <div className="w-4/5 mx-auto px-4 overflow-auto md:overflow-visible md:px-8">
                            {tables.map((table, idx) => (
                                <table key={idx} className="w-full table-auto text-sm text-left">
                                    <thead className="text-gray-600 font-medium border-b dark:text-white">
                                        <tr>
                                            <th className="z-20 top-12 py-6">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="w-12 h-12 text-indigo-600 rounded-full border flex items-center justify-center">
                                                        {table.label_icon}
                                                    </div>
                                                    <h4 className="text-gray-400 text-xl font-medium dark:text-white">{table.label}</h4>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-gray-700">
                                        {table.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{item.name}</td>
                                                {/* For large devices */}
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell dark:text-white">
                                                    {item.basic}
                                                </td>
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell dark:text-white">
                                                    {item.business}
                                                </td>
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell dark:text-white">
                                                    {item.enterprise}
                                                </td>
                                                {/* For small devices */}
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap lg:hidden dark:text-white">
                                                    {item[selectedPlan.toLowerCase()]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricingPage;