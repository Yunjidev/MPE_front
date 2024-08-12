import { MdCalendarToday } from 'react-icons/md';

const AgendaManagement = () => {
    return (
        <div className="bg-neutral-800 text-white p-6 rounded-lg max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Mes rendez-vous</h2>
            <table className="table-auto w-full bg-neutral-800 rounded-lg border border-white border-collapse">
                <tbody>
                    <tr className="border-b border-white">
                        <td className="px-4 py-4 border-r border-white align-middle h-full">
                            <div className="flex items-center h-full">
                                <MdCalendarToday size={24} className="mr-2" />
                                <span>Coiffeuse du 34</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 border-r border-white align-middle">
                            Jeudi 1 Août 2024
                        </td>
                        <td className="px-4 py-4 border-r border-white align-middle">
                            14h30
                        </td>
                        <td className="px-4 py-4 text-right align-middle">
                            <button className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-neutral-800 transition-colors">
                                Annuler
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b border-white">
                        <td className="px-4 py-4 border-r border-white align-middle h-full">
                            <div className="flex items-center h-full">
                                <MdCalendarToday size={24} className="mr-2" />
                                <span>Plomberie Gégé</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 border-r border-white align-middle">
                            Jeudi 1 Août 2024
                        </td>
                        <td className="px-4 py-4 border-r border-white align-middle">
                            14h30
                        </td>
                        <td className="px-4 py-4 text-right align-middle">
                            <button className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-neutral-800 transition-colors">
                                Annuler
                            </button>
                        </td>
                    </tr>
                    {/* Ligne vide pour l'espace supplémentaire */}
                    <tr className="border-b border-white">
                        <td className="px-4 py-4 border-r border-white"></td>
                        <td className="px-4 py-4 border-r border-white"></td>
                        <td className="px-4 py-4 border-r border-white"></td>
                        <td className="px-4 py-4"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AgendaManagement;
