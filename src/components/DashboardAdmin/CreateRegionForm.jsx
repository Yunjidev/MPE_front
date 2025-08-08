import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData, putData, deleteData, getData } from "../../services/data-fetch";
import { toast } from "react-toastify";

const CreateRegionForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getData("countries");
        setRegions(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des régions:", error);
      }
    };

    fetchRegions();
  }, []);

  const onSubmitRegion = async (data) => {
    try {
      const regionResponse = await postData("admin/country", { name: data.regionName });

      if (regionResponse) {
        toast.success("Région créée avec succès !");
        reset();
        setRegions([...regions, regionResponse]);
      } else {
        toast.error("Erreur lors de la création de la région.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création de la région.");
    }
  };

  const onUpdateRegion = async (data) => {
    try {
      // console.log(`Updating region: ${selectedRegion.id} with data:`, data); 
      const regionResponse = await putData(`admin/country/${selectedRegion.id}`, { name: data.regionName });

      if (regionResponse) {
        toast.success("Région modifiée avec succès !");
        reset();
        setRegions(regions.map(region => region.id === selectedRegion.id ? regionResponse : region));
        setSelectedRegion(null);
      } else {
        toast.error("Erreur lors de la modification de la région.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la région:", error);
      toast.error("Erreur lors de la modification de la région.");
    }
  };

  const onDeleteRegion = async () => {
    try {
      // console.log(`Deleting region: ${selectedRegion.id}`); 
      const regionResponse = await deleteData(`admin/country/${selectedRegion.id}`);
      // console.log('Delete response:', regionResponse); 

      if (regionResponse && regionResponse.message === "Region supprimée") {
        toast.success("Région supprimée avec succès !");
        reset();
        setRegions(regions.filter(region => region.id !== selectedRegion.id));
        setSelectedRegion(null);
      } else {
        toast.error("Erreur lors de la suppression de la région.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression de la région.");
    }
  };

  const handleRegionSelect = (event) => {
    const selectedRegionName = event.target.value;
    const selectedRegion = regions.find(region => region.name === selectedRegionName);
    if (selectedRegion) {
      setSelectedRegion(selectedRegion);
      setValue("regionName", selectedRegion.name);
      // console.log("Region selected:", selectedRegion); 
    } else {
      setSelectedRegion(null);
      reset();
      // console.log("No region selected"); 
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg mt-6">
      <h2 className="bg-gradient-to-r from-white to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">
        Gestion des Régions
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <div className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3">
        <div className="flex flex-col lg:col-span-2 gap-6">
          <label htmlFor="regionSelect" className="text-white">Sélectionner une région</label>
          <select
            id="regionSelect"
            onChange={handleRegionSelect}
            className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
          >
            <option value="">Nouvelle Région</option>
            {regions.map(region => (
              <option key={region.id} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit(selectedRegion ? onUpdateRegion : onSubmitRegion)} className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3 mt-6">
        <div className="flex flex-col lg:col-span-2 gap-6">
          <div className="relative flex items-center">
            <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
            <input
              id="regionName"
              type="text"
              {...register("regionName", { required: true })}
              placeholder="Nom de la région"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-96 bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-[#67FFCC] transition duration-300 ease-in-out"
            type="submit"
          >
            {selectedRegion ? "Modifier Région" : "Créer Région"}
          </button>
        </div>
      </form>
      {selectedRegion && (
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-96 bg-red-500 hover:bg-red-700 text-white items-center justify-center font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={onDeleteRegion}
          >
            Supprimer Région
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRegionForm;

