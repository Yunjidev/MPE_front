/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import Cookies from 'js-cookie';
import {
  FaUser,
  FaEnvelope,
  FaFileUpload,
} from 'react-icons/fa';
import Button from '../Button/button';

const EditProfileForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      avatar: null,
    },
  });

  useEffect(() => {
    if (user) {
      // Remise à zéro des valeurs par défaut avant de mettre à jour
      reset({
        username: user.username || '',
        email: user.email || '',
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        avatar: null, // L'avatar ne doit pas être réinitialisé ici
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);

    // Si un fichier a été sélectionné
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }

    try {
      const token = Cookies.get('mpe-auth');
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please check your authentication.');
        } else {
          throw new Error('Failed to update profile.');
        }
      }

      const updatedUser = await response.json();

      // Vérifiez si un nouveau token est renvoyé
      if (updatedUser.token) {
        // Met à jour le cookie avec le nouveau token
        Cookies.set('mpe-auth', updatedUser.token, { secure: true, sameSite: 'Strict' });
      }

      // Mettre à jour l'état utilisateur
      setUser(updatedUser);

      // Mise à jour des valeurs dans le formulaire
      reset({
        username: updatedUser.username,
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        avatar: null, // L'avatar ne doit pas être réinitialisé ici
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mt-12 mb-8 flex items-center justify-center bg-neutral-900">
      <div className="relative border-form-1 group max-w-4xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">
            Edit Profile
          </h2>
          <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3">
            {/* Avatar Image */}
            <div className="flex justify-center items-center">
              <label
                htmlFor="avatar"
                className="border border-gray-500 p-10 rounded-full cursor-pointer text-gray-400 hover:bg-gray-800 h-56 w-56 flex flex-col justify-center items-center"
              >
                <FaFileUpload className="text-3xl" />
                <p className="mt-2 text-center text-sm">
                  Cliquez pour ajouter une photo
                </p>
              </label>
              <input
                id="avatar"
                type="file"
                {...register('avatar')}
                className="hidden"
              />
            </div>
            {/* Fields */}
            <div className="flex flex-col lg:col-span-1 gap-6">
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  {...register('username', { required: true })}
                  placeholder="Username"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Email"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-400" />
                <input
                  id="firstname"
                  type="text"
                  {...register('firstname')}
                  placeholder="First Name"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-400" />
                <input
                  id="lastname"
                  type="text"
                  {...register('lastname')}
                  placeholder="Last Name"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
