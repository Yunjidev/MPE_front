import React from 'react';
import ProfileManagement from '../../components/company/Company_profile';

const Companydb = () => {
    return (
        <div className="bg-neutral-600 text-white p-6 rounded-lg max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Gestion du Profil</h2>
            <hr className="w-11/12 mb-12"></hr>
                <div>
                    <ProfileManagement />
                </div>
        </div>
    );
};

export default Companydb