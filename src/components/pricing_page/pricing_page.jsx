import { useState } from "react";
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
            name: "Basique",
            desc: "Découvrez notre solution basique pour votre entreprise.",
            price: "0€",
            color: "text-green-300 ",
            buttonColor: "bg-green-300 hover:bg-green-500 active:bg-green-600"
        },
        {
            name: "Mensuel",
            desc: "Profitez de notre solution mensuelle pour plus de services.",
            price: "35€",
            color: "text-orange-400",
            buttonColor: "bg-orange-400 hover:bg-orange-500 active:bg-orange-600"
        },
        {
            name: "Annuel",
            desc: "Optez pour notre solution annuelle pour avoir 2 mois offerts.",
            price: "350€",
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
                    basique: checkIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Page d'entreprise",
                    basique: checkIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Statistiques détaillées",
                    basique: checkIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Dashboard entreprise",
                    basique: checkIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Mise en avant sur l'accueil",
                    basique: minusIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Priorisation dans les recherches",
                    basique: minusIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Certification Premium",
                    basique: minusIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Galerie Photo",
                    basique: minusIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
                {
                    name: "Calendrier + Réservations",
                    basique: minusIcon,
                    mensuel: checkIcon,
                    annuel: checkIcon
                },
            ]
        }
    ];

    const [selectedPlan, setSelectedPlan] = useState(plans[0].name);

    return (
        <>
            <div className="mx-auto">
                <h1 className="text-4xl text-center font-bold mt-14 text-white gradient-text-orange">Notre formule premium</h1>

                <div className="mx-auto flex flex-col text-center lg:text-start justify-around lg:flex-row items-center py-6 ">
                    <div className="md:ml-8 md:mt-0">
                        <p className="lg:text-2xl md:text-xl text-center lg:mx-6 text-white">
                            Profitez de toutes les fonctionnalités proposées par MPE à un tarif avantageux pour une durée choisie.
                        </p>
                    </div>
                </div>

                <div className="mx-auto flex flex-col lg:flex-row justify-start items-center py-8 lg:py-12">
                    <img src="public/assets/img/decouvrez.png" alt="Image 2" className="lg:w-5/12 w-full mt-8 lg:mt-0 lg:mr-8 order-first lg:order-last rounded-lg" />
                    <div className="mt-4 text-center lg:text-start md:mt-0 flex flex-col ">
                        <h1 className="text-4xl text-center lg:text-start mb-12 lg:ml-6 font-semibold text-white gradient-text-violet">Mise en avant de votre entreprise</h1>
                        <p className="lg:text-2xl md:text-xl lg:mx-6 text-white">
                            Augmentez votre chiffre d’affaires en apparaissant dans les premiers résultats de recherche d’un utilisateur. Votre entreprise sera également affichée sur la page d’accueil.
                        </p>
                    </div>
                </div>

                <div className="mx-auto flex flex-col justify-around lg:flex-row items-center py-8 px-4 lg:py-16">
                    <img src="public/assets/img/vector.png" alt="Image 3" className="w-1/2 rounded-lg hide-on-small" />
                    <img src="src/assets/calendarpres.png" alt="Image 3" className="mr-16 w-full rounded-lg block lg:hidden" />
                    <div className="md:ml-8 text-center lg:text-start lg:mt-4 md:mt-0 lg:w-1/2">
                        <p className="lg:text-2xl md:text-xl lg:mx-6 text-white">
                            Profitez de toutes les fonctionnalités proposées par MPE à un tarif avantageux pour une durée choisie.
                        </p>
                    </div>
                </div>

                <div className="mx-auto flex flex-col lg:flex-row justify-start items-center py-8 lg:py-16">
                    <img src="public/assets/img/decouvrez.png" alt="Image 4" className="w-10/12 lg:w-5/12 mt-8 lg:mt-0 lg:mr-8 order-first lg:order-last rounded-lg" />
                    <div className="mt-4 md:mt-0 text-center lg:text-start flex flex-col lg:items-start lg:text-left">
                        <h1 className="text-4xl mb-12 lg:ml-6 font-bold text-white gradient-text-green">Organisez l’activité de votre entreprise</h1>
                        <p className="lg:text-2xl md:text-xl lg:mx-6 text-white">
                            Le dashboard administrateur mit à votre disposition permet d’avoir un regard précis sur le nombre de passage de clients sur votre page, les rendez-vous, demande de contact,...
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-center text-white gradient-text-orange">Comparez nos formules</h2>
            </div>

            <section className="py-4 mb-28">
                <div className="">
                    <div className="mt-16">
                        <div className="top-0">
                            <div className="max-w-screen-xl mx-auto">
                                <ul className="flex flex-wrap justify-center items-center gap-x-6 px-4 ">
                                    <li className="flex justify-center w-full lg:w-auto">
                                        <img src="public/assets/img/logo.png" alt="Logo" className="w-36 lg:w-48" />
                                    </li>
                                    {plans.map((item, idx) => (
                                        <li key={idx} className={`space-y-4 w-full lg:w-1/5 ${item.name !== selectedPlan ? "hidden lg:block" : ""}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="relative lg:hidden">
                                                    <select
                                                        value={selectedPlan}
                                                        className="bg-gray-900 appearance-none outline-none px-4 py-2 cursor-pointer bg-gray-700 text-white"
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
                                            <div className={`${item.color} text-2xl font-semibold text-center flex flex-col`}>
                                                <span>{item.name}</span>
                                                <span className="text-lg font-normal">{item.price}/mois</span>
                                            </div>
                                            <p className="text-sm text-white text-center">{item.desc}</p>
                                            <a href="#" className={`px-4 py-3 block text-center rounded-lg w-full font-semibold text-base duration-150 text-black  ${item.buttonColor}`}>
                                                Souscrire
                                            </a>
                                        </li>
                                    ))}
                                </ul>



                            </div>
                        </div>
                        <div className="w-full flex justify-center overflow-auto md:overflow-visible flex justify-center">
                            {tables.map((table, idx) => (
                                <table key={idx} className="w-fulltable-auto text-sm text-left">
                                    <thead className="text-gray-600 font-medium border-b text-white">
                                        <tr>
                                            <th className="z-20 top-12 py-6">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="w-12 h-12 text-indigo-600 rounded-full border flex items-center justify-center">
                                                        {table.label_icon}
                                                    </div>
                                                    <h4 className="text-gray-400 text-xl font-medium text-white">{table.label}</h4>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-ydivide-gray-700">
                                        {table.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 m-4 whitespace-nowrap text-white">{item.name}</td>
                                                {/* For large devices */}
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell text-white">
                                                    {item.basique}
                                                </td>
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell text-white">
                                                    {item.mensuel}
                                                </td>
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell text-white">
                                                    {item.annuel}
                                                </td>
                                                {/* For small devices */}
                                                <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap lg:hidden text-white">
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