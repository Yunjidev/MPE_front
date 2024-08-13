import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { FaUser, FaEnvelope, FaFileUpload } from "react-icons/fa";
import { putData } from "../../services/data-fetch";

const EditProfileForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      avatar: null,
    },
  });

  // Vérifier les données utilisateur et mettre à jour le formulaire
  useEffect(() => {
    if (user) {
      console.log("User data from atom:", user);

      const userData = user.user || user;
      reset({
        username: userData.username || "",
        email: userData.email || "",
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        avatar: null,
      });

      // Si les données ne sont pas réinitialisées correctement, utiliser setValue
      setValue("username", userData.username || "");
      setValue("email", userData.email || "");
      setValue("firstname", userData.firstname || "");
      setValue("lastname", userData.lastname || "");
    }
  }, [user, reset, setValue]);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    /*const formData = new FormData();

    // Ajouter uniquement les champs modifiés
    if (data.username !== user.username)
      formData.append("username", data.username);
    if (data.email !== user.email) formData.append("email", data.email);
    if (data.firstname !== user.firstname)
      formData.append("firstname", data.firstname);
    if (data.lastname !== user.lastname)
      formData.append("lastname", data.lastname);

    // Si un fichier a été sélectionné
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    console.log("Form data:", formData);*/
    const userUpdate = {};
    if (data.username !== user.username) userUpdate.username = data.username;
    if (data.email !== user.email) userUpdate.email = data.email;
    if (data.firstname !== user.firstname)
      userUpdate.firstname = data.firstname;
    if (data.lastname !== user.lastname) userUpdate.lastname = data.lastname;
    if (data.avatar && data.avatar[0]) {
      userUpdate.avatar = data.avatar[0];
    }

    const response = await putData("user/update", userUpdate);
    console.log("Response from PUT:", response);
    setUser((prevUser) => ({
      ...prevUser,
      user: response.user,
      isLogged: true,
    }));

    alert("Profile updated successfully");

    /*try {
      const token = Cookies.get('mpe-auth');
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}user/update`, {
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

      if (updatedUser.token) {
        Cookies.set('mpe-auth', updatedUser.token, { secure: true, sameSite: 'Strict' });
      }

      setUser(updatedUser);

      reset({
        username: updatedUser.username,
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        avatar: null,
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
      alert(`Error: ${error.message}`);
    }*/
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-5">
        Edition de profil
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3"
      >
        <div className="flex justify-center items-center">
          <label
            htmlFor="avatar"
            className="border border-gray-500 p-10 rounded-full cursor-pointer text-gray-400 hover:bg-neutral-700 h-56 w-56 flex flex-col justify-center items-center"
          >
            <FaFileUpload className="text-3xl" />
            <p className="mt-2 text-center text-sm">
              Cliquez pour ajouter une photo
            </p>
          </label>
          <input
            id="avatar"
            type="file"
            {...register("avatar")}
            className="hidden"
          />
        </div>
        <div className="flex flex-col lg:col-span-1 gap-6">
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400" />
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400" />
            <input
              id="firstname"
              type="text"
              {...register("firstname")}
              placeholder="First Name"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400" />
            <input
              id="lastname"
              type="text"
              {...register("lastname")}
              placeholder="Last Name"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            className="flex w-full dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-200 transition duration-300 ease-in-out"
            type="submit"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
