import { RxRocket } from "react-icons/rx";
import './pricing.css';

export default function Pricing() {

    const plans1 = [
        {
            name: "Découverte",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: "0.99€",
            isMostPop: false,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },

    ];

    const plans2 = [

        {
            name: "Premium",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: "35€",
            isMostPop: true,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];

    const plans3 = [
        {
            name: "Vip",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: "12€",
            isMostPop: false,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },

    ];


    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-white md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-white text-3xl font-semibold sm:text-4xl text-center'>
                        Pricing for all sizes
                    </h3>
                    <div className='mt-3 max-w-xl text-center'>
                        <p className='text-white'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans1.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-neutral-900 border-2 border-green-400 shadow-lg neon-vert hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-green-400 text-center text-white text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 text-center">
                                    
                                    <span className='text-green-200 font-medium text-4xl flex justify-evenly items-center'>
                                    <RxRocket /> {item.name} 
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
                                    <button className='px-6 py-3 rounded-lg w-4/5 font-semibold text-sm duration-150 text-white bg-green-400 hover:bg-green-500 active:bg-green-700'>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {
                        plans2.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-neutral-900 border-4 border-orange-400 shadow-lg neon-orange hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-orange-400 text-center text-white text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 text-center">
                                    <span className='text-orange-400 font-medium text-4xl'>
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
                                    <button className='px-6 py-3 rounded-lg w-4/5 font-semibold text-sm duration-150 text-white bg-orange-400 hover:bg-orange-500 active:bg-orange-400'>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {
                        plans3.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col items-stretch rounded-xl border-2 mt-6 bg-neutral-900 border-2 border-violet-400 shadow-lg neon-violet hover:scale-105 transform transition duration-500 ease-in-out sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-orange-400 text-center text-gray-700 text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 text-center">
                                    <span className='text-violet-400 font-medium text-4xl'>
                                        {item.name}
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
                                    <button className='px-6 py-3 rounded-lg w-4/5 font-semibold text-sm duration-150 text-white bg-violet-400 hover:bg-violet-500 active:bg-violet-400'>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );


}
