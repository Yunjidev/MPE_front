/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { putData } from "../../services/data-fetch";

export default function EditOfferForm({ offer, onClose, onSave }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      duration: 0,
      price: "",
      estimate: false,
      image: "",
    },
  });

  useEffect(() => {
    if (offer) {
      reset({
        name: offer.name || "",
        description: offer.description || "",
        duration: offer.duration || 0,
        price: offer.price || "",
        estimate: offer.estimate || false,
        image: offer.image || "",
      });

      setValue("name", offer.name || "");
      setValue("description", offer.description || "");
      setValue("duration", offer.duration || 0);
      setValue("price", offer.price || "");
      setValue("estimate", offer.estimate || false);
      setValue("image", offer.image || "");
    }
  }, [offer, reset, setValue]);

  const onSubmit = async (data) => {
    const offerUpdate = {};

    if (data.name !== offer.name) offerUpdate.name = data.name;
    if (data.description !== offer.description) offerUpdate.description = data.description;
    if (data.duration !== offer.duration) offerUpdate.duration = data.duration;
    if (data.price !== offer.price) offerUpdate.price = data.price;
    if (data.estimate !== offer.estimate) offerUpdate.estimate = data.estimate;
    if (data.image !== offer.image) offerUpdate.image = data.image;

    try {
      const response = await putData(`admin/offers/${offer.id}`, offerUpdate);
      onSave({ ...offer, ...offerUpdate });
      alert("Offer updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating offer:", error);
      alert("Failed to update offer");
    }
  };

  return (
    <div className="bg-neutral-900 text-white w-full p-8">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold">Édition Offre</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom de l'offre
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Nom de l'offre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            rows="4"
            placeholder="Description de l'offre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium">
            Durée (en heures)
          </label>
          <input
            type="number"
            id="duration"
            {...register("duration", { required: true })}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Durée de l'offre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Prix
          </label>
          <input
            type="text"
            id="price"
            {...register("price", { required: true })}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Prix de l'offre"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="estimate"
            {...register("estimate")}
            className="mr-2"
          />
          <label htmlFor="estimate" className="text-sm font-medium">
            Estimation seulement
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image")}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text font-semibold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}

EditOfferForm.propTypes = {
  offer: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
